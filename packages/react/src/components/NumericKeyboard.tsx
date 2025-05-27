import type { KeyEvent } from '../types'
import React from 'react'
import keyboardBackspace from '../assets/icons/keyboard-backspace.svg'
import keyboardReturn from '../assets/icons/keyboard-return.svg'
import keyboardSpace from '../assets/icons/keyboard-space.svg'
import '../styles/NumericKeyboard.scss'

interface NumericKeyboardProps {
  onKey: (payload: KeyEvent) => void
  onExit: () => void
}

const NumericKeyboard: React.FC<NumericKeyboardProps> = ({ onKey, onExit }) => {
  const keyboardRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['back', '0', 'space'],
  ]

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
                    onClick={() =>
                      key === 'back'
                        ? goBack()
                        : key === 'space'
                          ? handleKeyPress(' ')
                          : handleKeyPress(key)}
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
              onClick={() =>
                fKey.key === '.' || fKey.key === '@'
                  ? handleKeyPress(fKey.key)
                  : handleSpecialKey(fKey.key)}
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
