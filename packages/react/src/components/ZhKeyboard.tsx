import type { KeyboardPosition } from '@zh-keyboard/core'
import type { KeyBoardMode, KeyEvent } from '../types'
import { useActiveElement, useElementSize, useEventListener } from '@reactuses/core'
import { calculateKeyboardPosition, delToInputElement, isInputElement, writeToInputElement } from '@zh-keyboard/core'
import classNames from 'classnames'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
  const [keyboardPosition, setKeyboardPosition] = useState<KeyboardPosition | null>(null)
  const keyboardRef = useRef<HTMLDivElement>(null)
  const activeElement = useActiveElement<HTMLInputElement>()

  const [_, keyboardHeight] = useElementSize(keyboardRef)

  const { recognizerInitialized, recognizerProgress } = useHandwritingRecognizer(enableHandwriting)

  useEffect(() => {
    previousModeRef.current = mode
  }, [mode])

  const [isPositioned, setIsPositioned] = useState(false)

  const updateKeyboardPosition = useCallback(() => {
    if (keyboardHeight) {
      const newPosition = calculateKeyboardPosition(
        activeElement,
        keyboardRef.current,
        position,
      )
      setKeyboardPosition(newPosition)
    }

    setTimeout(() => {
      setIsPositioned(true)
    }, 0)
  }, [activeElement, position, keyboardHeight])

  const showKeyboard = useMemo(() => {
    return position === 'static' || isInputElement(activeElement)
  }, [activeElement, position])

  useLayoutEffect(() => {
    if (showKeyboard) {
      setIsPositioned(false)
      updateKeyboardPosition()
    }
  }, [showKeyboard, updateKeyboardPosition])

  useLayoutEffect(() => {
    if (activeElement && isInputElement(activeElement)) {
      const inputmode = activeElement.dataset.inputmode as KeyBoardMode | undefined
      setMode((prevMode) => {
        return inputmode || prevMode
      })
    }
  }, [activeElement])

  const isKeyboardDisabled = useMemo(() => {
    if (disableWhenNoFocus === false)
      return false
    return !isInputElement(activeElement)
  }, [disableWhenNoFocus, activeElement])

  useEventListener('scroll', updateKeyboardPosition, window, { passive: true })
  useEventListener('resize', updateKeyboardPosition, window, { passive: true })

  const handleKeyEvent = useCallback((payload: KeyEvent) => {
    if (payload.isControl) {
      switch (payload.key) {
        case 'delete':
          if (isInputElement(activeElement))
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
        '--keyboard-height': `${keyboardHeight}px`,
        ...keyboardPosition,
        ...style,
        'display': !showKeyboard ? 'none' : undefined,
        'opacity': isPositioned ? 1 : 0,
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
              {mode === 'hand' && (
                <HandwritingInput
                  recognizerInitialized={recognizerInitialized}
                  recognizerProgress={recognizerProgress}
                  onKey={handleKeyEvent}
                  onExit={goBack}
                />
              )}
              {mode === 'num' && <NumericKeyboard onKey={handleKeyEvent} onExit={goBack} />}
              {mode === 'symbol' && <SymbolKeyboard onKey={handleKeyEvent} onExit={goBack} />}
              {(mode === 'en' || mode === 'zh') && (
                <KeyboardBase
                  mode={mode}
                  setMode={setMode}
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
