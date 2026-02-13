import type { KeyEvent } from '../types'
import React from 'react'
import keyboardBackspace from '../assets/icons/keyboard-backspace.svg'
import keyboardReturn from '../assets/icons/keyboard-return.svg'
import keyboardSpace from '../assets/icons/keyboard-space.svg'
import { useKeyRepeater } from '../hooks/useKeyRepeater'
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
  const { startRepeat, stopRepeat } = useKeyRepeater()

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

  function preventContextMenu(e: React.MouseEvent) {
    e.preventDefault()
  }

  function onKeyDown(key: string, e: React.PointerEvent<Element>) {
    if (key === 'back') {
    // 返回按钮特殊处理，从onclick触发
    } else {
      if (key === 'space') {
        key = ' '
      }
      if (key === 'delete' || key === 'enter') {
        startRepeat(e, () => handleSpecialKey(key))
      } else {
        startRepeat(e, () => handleKeyPress(key))
      }
    }
  }

  const renderKeyContent = (key: string) => {
    if (key === 'back')
      return '返回'
    if (key === 'space')
      return <img src={keyboardSpace} className="zhk-base__key-icon" alt="Space" />
    return key
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
                    onClick={() => key === 'back' && goBack()}
                    onPointerDown={e => onKeyDown(key, e)}
                    onPointerUp={stopRepeat}
                    onPointerLeave={stopRepeat}
                    onPointerCancel={stopRepeat}
                    onContextMenu={preventContextMenu}
                  >
                    {renderKeyContent(key)}
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
