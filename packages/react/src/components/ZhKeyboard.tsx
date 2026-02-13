import type { KeyboardPosition } from '@zh-keyboard/core'
import type { KeyBoardMode, KeyEvent } from '../types'
import { useActiveElement, useElementSize, useEventListener } from '@reactuses/core'
import { calculateKeyboardPosition, delToInputElement, getKeyboardConfig, isInputElement, writeToInputElement } from '@zh-keyboard/core'
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
  numKeys?: string[][]
}

const ZHKeyboardContent: React.FC<ZhKeyboardProps> = ({
  defaultMode = getKeyboardConfig().defaultMode ?? 'en',
  enableHandwriting = getKeyboardConfig().enableHandwriting ?? false,
  position = getKeyboardConfig().position ?? 'static',
  disableWhenNoFocus = getKeyboardConfig().disableWhenNoFocus ?? true,
  onKey,
  className,
  style,
  numKeys,
}) => {
  const [mode, setMode] = useState<KeyBoardMode>(defaultMode)
  const previousModeRef = useRef<KeyBoardMode>(defaultMode)
  const [keyboardPosition, setKeyboardPosition] = useState<KeyboardPosition | null>(null)
  const keyboardRef = useRef<HTMLDivElement>(null)
  const activeElement = useActiveElement<HTMLInputElement>()

  const [_, keyboardHeight] = useElementSize(keyboardRef)

  const { recognizerInitialized, recognizerProgress } = useHandwritingRecognizer(enableHandwriting)

  useEffect(() => {
    // 仅在基础输入模式下更新 previousModeRef，以便 goBack 正确返回
    if (mode === 'en' || mode === 'zh') {
      previousModeRef.current = mode
    }
  }, [mode])

  const [isPositioned, setIsPositioned] = useState(false)
  const prevActiveElementRef = useRef<HTMLInputElement | null>(null)

  // 位置更新函数
  const updatePosition = useCallback(() => {
    if (!keyboardHeight)
      return

    const newPosition = calculateKeyboardPosition(
      activeElement,
      keyboardRef.current,
      position,
    )
    setKeyboardPosition(newPosition)
  }, [activeElement, position, keyboardHeight])

  const showKeyboard = useMemo(() => {
    return position === 'static' || isInputElement(activeElement)
  }, [activeElement, position])

  // 当showKeyboard或activeElement变化时更新位置
  useLayoutEffect(() => {
    // 检查activeElement是否真的变化了
    const activeElementChanged = prevActiveElementRef.current !== activeElement

    if (showKeyboard && keyboardHeight && activeElementChanged) {
      prevActiveElementRef.current = activeElement
      updatePosition()
    }
  }, [showKeyboard, activeElement, updatePosition, keyboardHeight])

  // 键盘首次挂载时的初始化
  useLayoutEffect(() => {
    if (keyboardHeight && !isPositioned) {
      updatePosition()
      const timer = setTimeout(() => {
        setIsPositioned(true)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [keyboardHeight, isPositioned, updatePosition])

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

  // 使用防抖来处理scroll和resize事件，避免频繁更新
  const debouncedUpdatePosition = useMemo(() => {
    let timer: ReturnType<typeof setTimeout>
    return () => {
      clearTimeout(timer)
      timer = setTimeout(updatePosition, 100)
    }
  }, [updatePosition])

  useEventListener('scroll', debouncedUpdatePosition, window, { passive: true })
  useEventListener('resize', debouncedUpdatePosition, window, { passive: true })

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
    if (['hand', 'num', 'symbol'].includes(previousModeRef.current)) {
      setMode(defaultMode)
    }
    setMode(previousModeRef.current)
  }, [defaultMode])

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
              {mode === 'num' && (
                <NumericKeyboard
                  onKey={handleKeyEvent}
                  onExit={goBack}
                  keyboardRows={numKeys}
                />
              )}
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
