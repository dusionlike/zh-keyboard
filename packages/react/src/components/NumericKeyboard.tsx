import type { KeyEvent } from '../types'
import { createKeyRepeater } from '@zh-keyboard/core'
import React, { useEffect, useRef } from 'react'
import keyboardBackspace from '../assets/icons/keyboard-backspace.svg'
import keyboardReturn from '../assets/icons/keyboard-return.svg'
import keyboardSpace from '../assets/icons/keyboard-space.svg'
import '../styles/NumericKeyboard.scss'

interface NumericKeyboardProps {
  onKey: (payload: KeyEvent) => void
  onExit: () => void
  keyboardRows?: string[][]
}

const DEFAULT_KEYBOARD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['back', '0', 'space'],
]

const NumericKeyboard: React.FC<NumericKeyboardProps> = ({
  onKey,
  onExit,
  keyboardRows = DEFAULT_KEYBOARD_ROWS,
}) => {
  const repeaterRef = useRef(createKeyRepeater())

  useEffect(() => {
    const repeater = repeaterRef.current
    return () => {
      repeater.stop()
    }
  }, [])

  const functionKeys = [
    { key: 'delete', icon: keyboardBackspace, text: '', alt: 'Delete' },
    { key: '.', icon: '', text: '.', alt: '.' },
    { key: '@', icon: '', text: '@', alt: '@' },
    { key: 'enter', icon: keyboardReturn, text: '', alt: 'Enter' },
  ]

  function handleKeyPress(key: string) {
    onKey({ key })
  }

  function handleSpecialKey(key: string, isControl = true) {
    onKey({ key, isControl })
  }

  function goBack() {
    onExit()
  }

  function startRepeat(e: React.PointerEvent, action: () => void) {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    repeaterRef.current.start(action)
  }

  function stopRepeat() {
    repeaterRef.current.stop()
  }

  function pressOnce(e: React.PointerEvent, action: () => void) {
    e.preventDefault()
    action()
  }

  function preventContextMenu(e: React.MouseEvent) {
    e.preventDefault()
  }

  function leftKeyAction(key: string): () => void {
    if (key === 'back')
      return goBack
    if (key === 'space')
      return () => handleKeyPress(' ')
    return () => handleKeyPress(key)
  }

  return (
    <div className="num-keyboard">
      <div className="num-keyboard__container">
        <div className="num-keyboard__left">
          <div className="num-keyboard__rows">
            {keyboardRows.map(row => (
              <div key={`row-${row.join('')}`} className="num-keyboard__row">
                {row.map(key => (
                  <button
                    key={`key-${row.join('')}-${key}`}
                    className={`num-keyboard__key ${
                      key === 'back' ? 'num-keyboard__key--back' : ''
                    } ${
                      key === 'space' ? 'num-keyboard__key--space' : ''
                    }`}
                    onPointerDown={(e) => {
                      const action = leftKeyAction(key)
                      if (key === 'back') {
                        pressOnce(e, action)
                        return
                      }
                      startRepeat(e, action)
                    }}
                    onPointerUp={stopRepeat}
                    onPointerLeave={stopRepeat}
                    onPointerCancel={stopRepeat}
                    onContextMenu={preventContextMenu}
                  >
                    {key === 'back'
                      ? (
                          '返回'
                        )
                      : key === 'space'
                        ? (
                            <img src={keyboardSpace} className="zhk-base__key-icon" alt="Space" />
                          )
                        : (
                            key
                          )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="num-keyboard__right">
          {functionKeys.map(fKey => (
            <button
              key={`func-${fKey.key}`}
              className="num-keyboard__key num-keyboard__key--function"
              onPointerDown={(e) => {
                if (fKey.key === '.' || fKey.key === '@') {
                  startRepeat(e, () => handleKeyPress(fKey.key))
                  return
                }
                startRepeat(e, () => handleSpecialKey(fKey.key))
              }}
              onPointerUp={stopRepeat}
              onPointerLeave={stopRepeat}
              onPointerCancel={stopRepeat}
              onContextMenu={preventContextMenu}
            >
              {fKey.icon
                ? (
                    <img src={fKey.icon} className="num-keyboard__key-icon" alt={fKey.alt} />
                  )
                : (
                    <span>{fKey.text}</span>
                  )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NumericKeyboard
