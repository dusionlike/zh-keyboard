import type { KeyBoardMode, KeyEvent } from '../types'
import { useActiveElement, useElementSize, useEventListener } from '@reactuses/core'
import { calculateKeyboardPosition, delToInputElement, isInputElement, writeToInputElement } from '@zh-keyboard/core'
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
}

const ZhKeyboard: React.FC<ZhKeyboardProps> = ({
  defaultMode = 'en',
  enableHandwriting = false,
  position = 'static',
  disableWhenNoFocus = true,
  onKey,
}) => {
  const [mode, setMode] = useState<KeyBoardMode>(defaultMode)
  const previousModeRef = useRef<KeyBoardMode>(defaultMode)
  const [keyboardPosition, setKeyboardPosition] = useState<{ top: number, left: number } | null>(null)
  const keyboardRef = useRef<HTMLDivElement>(null)
  const activeElement = useActiveElement<HTMLInputElement>()

  const [_, rootHeight] = useElementSize(keyboardRef)
  const keyboardHeight = useMemo(() => {
    return rootHeight ? `${rootHeight}px` : '300px'
  }, [rootHeight])

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

  const keyboardContent = (
    <div
      ref={keyboardRef}
      className={`zhk ${position === 'float' ? 'zhk--floating' : ''
      } ${position === 'bottom' ? 'zhk--bottom' : ''
      } ${isKeyboardDisabled ? 'zhk--disabled' : ''
      }`}
      style={{
        '--keyboard-height': keyboardHeight,
        ...position !== 'static' && keyboardPosition
          ? { top: `${keyboardPosition.top}px`, left: `${keyboardPosition.left}px` }
          : {},
        'display': (!showKeyboard || isKeyboardDisabled) ? 'none' : undefined,
      } as React.CSSProperties}
      onMouseDown={e => e.preventDefault()}
    >
      {isKeyboardDisabled
        ? (
            <div className="zhk__disabled-overlay">
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

  return position === 'static' ? keyboardContent : ReactDOM.createPortal(keyboardContent, document.body)
}

export default ZhKeyboard
