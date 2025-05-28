import type { KeyBoardMode, KeyEvent } from '../types'
import { useActiveElement, useElementSize, useEventListener } from '@reactuses/core'
import { calculateKeyboardPosition, delToInputElement, isInputElement, writeToInputElement } from '@zh-keyboard/core'
import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useHandwritingRecognizer } from '../utils/useHandwritingRecognizer'
import HandwritingInput from './HandwritingInput'
import KeyboardBase from './KeyboardBase'
import NumericKeyboard from './NumericKeyboard'
import SymbolKeyboard from './SymbolKeyboard'
import '../styles/ZhKeyboard.scss'

interface ZhKeyboardProps {
  defaultMode?: KeyBoardMode
  enableHandwriting?: boolean
  position?: 'static' | 'float' | 'bottom'
  disableWhenNoFocus?: boolean
  onKey?: (payload: KeyEvent) => void
  className?: string
  style?: React.CSSProperties
}

const ZHKeyboardContent: React.FC<ZhKeyboardProps> = ({
  defaultMode = 'en',
  enableHandwriting = false,
  position = 'static',
  disableWhenNoFocus = true,
  onKey,
  className,
  style,
}) => {
  const [mode, setMode] = useState<KeyBoardMode>(defaultMode)
  const previousModeRef = useRef<KeyBoardMode>(defaultMode)
  const [keyboardPosition, setKeyboardPosition] = useState<{ top: number, left: number } | null>(null)
  const keyboardRef = useRef<HTMLDivElement>(null)
  const activeElement = useActiveElement<HTMLInputElement>()

  const [_, keyboardHeight] = useElementSize(keyboardRef)
  const keyboardHeightpX = useMemo(() => {
    return keyboardHeight ? `${keyboardHeight}px` : '300px'
  }, [keyboardHeight])

  const { recognizerInitialized } = useHandwritingRecognizer(enableHandwriting)

  useEffect(() => {
    previousModeRef.current = mode
  }, [mode])

  const updateKeyboardPosition = useCallback(() => {
    if (!keyboardRef.current || !activeElement || position === 'static' || !isInputElement(activeElement))
      return
    const newPosition = calculateKeyboardPosition(
      activeElement,
      keyboardRef.current,
      position as 'static' | 'float' | 'bottom',
    )
    if (newPosition) {
      setKeyboardPosition(newPosition)
    }
  }, [activeElement, position])

  const showKeyboard = useMemo(() => {
    return position === 'static' || !!(activeElement && isInputElement(activeElement))
  }, [activeElement, position])

  useEffect(() => {
    if (showKeyboard) {
      ;(async () => {
        updateKeyboardPosition()
      })()
    }
  }, [showKeyboard, updateKeyboardPosition])

  useEffect(() => {
    if (activeElement && isInputElement(activeElement)) {
      const inputmode = activeElement.dataset.inputmode as KeyBoardMode | undefined
      ;(async () => {
        setMode((prevMode) => {
          return inputmode || prevMode
        })
      })()
    }
  }, [activeElement])

  const isKeyboardDisabled = useMemo(() => {
    if (disableWhenNoFocus === false)
      return false
    return !activeElement || !isInputElement(activeElement)
  }, [disableWhenNoFocus, activeElement])

  useEventListener('scroll', updateKeyboardPosition, window, { passive: true })
  useEventListener('resize', updateKeyboardPosition, window, { passive: true })

  const handleKeyEvent = useCallback((payload: KeyEvent) => {
    if (payload.isControl) {
      switch (payload.key) {
        case 'delete':
          if (activeElement && isInputElement(activeElement))
            delToInputElement(activeElement)
          break
        default:
          break
      }
    } else {
      if (activeElement && isInputElement(activeElement))
        writeToInputElement(activeElement, payload.key)
    }
    if (onKey) {
      onKey(payload)
    }
  }, [onKey, activeElement])

  const goBack = useCallback(() => {
    setMode(previousModeRef.current)
  }, [])

  return (
    <div
      ref={keyboardRef}
      className={classNames('zhk', {
        'zhk--floating': position === 'float',
        'zhk--bottom': position === 'bottom',
        'zhk--disabled': isKeyboardDisabled,
      }, className)}
      style={{
        '--keyboard-height': keyboardHeightpX,
        ...position !== 'static' && keyboardPosition
          ? { top: `${keyboardPosition.top}px`, left: `${keyboardPosition.left}px` }
          : {},
        ...style,
        'display': !showKeyboard ? 'none' : undefined,
      } as React.CSSProperties}
      onMouseDown={e => e.preventDefault()}
    >
      {isKeyboardDisabled || !showKeyboard || !keyboardHeight
        ? (
            <div className={classNames('zhk__disabled-overlay')}>
              <span>请选择输入框以启用键盘</span>
            </div>
          )
        : (
            <>
              {mode === 'hand' && <HandwritingInput onKey={handleKeyEvent} onExit={goBack} />}
              {mode === 'num' && <NumericKeyboard onKey={handleKeyEvent} onExit={goBack} />}
              {mode === 'symbol' && <SymbolKeyboard onKey={handleKeyEvent} onExit={goBack} />}
              {(mode === 'en' || mode === 'zh') && (
                <KeyboardBase
                  mode={mode}
                  setMode={setMode}
                  recognizerInitialized={recognizerInitialized}
                  enableHandwriting={enableHandwriting}
                  onKey={handleKeyEvent}
                />
              )}
            </>
          )}
    </div>
  )
}

const ZhKeyboard: React.FC<ZhKeyboardProps> = (props) => {
  const { position = 'static' } = props

  const keyboardContent = <ZHKeyboardContent {...props} />
  return position === 'static' ? keyboardContent : ReactDOM.createPortal(keyboardContent, document.body)
}

export default ZhKeyboard
