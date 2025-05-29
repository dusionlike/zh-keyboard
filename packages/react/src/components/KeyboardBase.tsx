import type { KeyBoardMode, KeyEvent } from '../types'
import React, { useMemo, useState } from 'react'
import keyboardBackspace from '../assets/icons/keyboard-backspace.svg'
import keyboardCaps from '../assets/icons/keyboard-caps.svg'
import keyboardReturn from '../assets/icons/keyboard-return.svg'
import keyboardSpace from '../assets/icons/keyboard-space.svg'
import CandidateBar from './CandidateBar'
import '../styles/KeyboardBase.scss'

interface KeyboardBaseProps {
  enableHandwriting?: boolean
  mode: KeyBoardMode
  onKey: (payload: KeyEvent) => void
  setMode: (mode: KeyBoardMode) => void
}

const KeyboardBase: React.FC<KeyboardBaseProps> = ({ enableHandwriting, mode, onKey, setMode }) => {
  const [isUpperCase, setIsUpperCase] = useState(false)
  const [pinyin, setPinyin] = useState('')

  const isChineseMode = useMemo(() => mode === 'zh', [mode])
  const showUpperCase = useMemo(() => isChineseMode ? true : isUpperCase, [isChineseMode, isUpperCase])

  function handleSpecialKey(key: string, isControl = false) {
    onKey({ key, isControl })
  }

  function handleShift() {
    if (isChineseMode) {
      setMode('hand')
    } else {
      setIsUpperCase(!isUpperCase)
    }
  }

  function handleSwitchToNum() {
    setMode('num')
  }

  function handleSwitchToSymbol() {
    setMode('symbol')
  }

  const numbersRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ]

  function handleDelete() {
    if (mode === 'zh' && pinyin) {
      setPinyin(pinyin.slice(0, -1))
      return
    }
    handleSpecialKey('delete', true)
  }

  function handleKeyPress(key: string) {
    if (mode === 'zh') {
      setPinyin(pinyin + key)
      return
    }
    const outputKey = isUpperCase ? key.toUpperCase() : key
    handleSpecialKey(outputKey)
  }

  function handleToggleLang() {
    setMode(mode === 'zh' ? 'en' : 'zh')
  }

  const handwritingButtonText = useMemo(() => {
    if (!enableHandwriting)
      return '-'
    return '手写'
  }, [enableHandwriting])

  const isHandwritingButtonDisabled = useMemo(() => {
    return !enableHandwriting
  }, [enableHandwriting])

  return (
    <div className="zhk-base">
      <div className="zhk-base__row">
        {mode === 'zh'
          ? (
              <CandidateBar
                currentPinyin={pinyin}
                onInput={e => handleSpecialKey(e, false)}
                onKey={onKey}
                setCurrentPinyin={setPinyin}
              />
            )
          : (
              numbersRow.map(key => (
                <button
                  key={`number-${key}`}

                  className="zhk-base__key zhk-base__key--letter"
                  onClick={() => handleKeyPress(key)}
                >
                  {key}
                </button>
              ))
            )}
      </div>

      {keyboardRows.map((row, rowIndex) => (
        <div key={`row-${row.join('')}`} className="zhk-base__row">
          {rowIndex === 2 && (
            <button

              className={`zhk-base__key zhk-base__key--function zhk-base__key--shift ${
                !isChineseMode && isUpperCase ? 'zhk-base__key--active' : ''
              } ${
                isChineseMode && isHandwritingButtonDisabled ? 'zhk-base__key--disabled' : ''
              }`}
              disabled={isChineseMode && isHandwritingButtonDisabled}
              onClick={handleShift}
            >
              {isChineseMode
                ? handwritingButtonText
                : <img src={keyboardCaps} className="zhk-base__key-icon" alt="Shift" />}
            </button>
          )}
          {row.map(key => (
            <button
              key={key}

              className="zhk-base__key zhk-base__key--letter"
              onClick={() => handleKeyPress(key)}
            >
              {showUpperCase ? key.toUpperCase() : key}
            </button>
          ))}
          {rowIndex === 2 && (
            <button

              className="zhk-base__key zhk-base__key--function zhk-base__key--delete"
              onClick={handleDelete}
            >
              <img src={keyboardBackspace} className="zhk-base__key-icon" alt="Delete" />
            </button>
          )}
        </div>
      ))}

      <div className="zhk-base__row">
        <button className="zhk-base__key zhk-base__key--function" onClick={handleSwitchToSymbol}>
          符
        </button>
        <button className="zhk-base__key zhk-base__key--function" onClick={handleSwitchToNum}>
          123
        </button>
        <button className="zhk-base__key" onClick={() => handleSpecialKey(',')}>
          ，
        </button>
        <button className="zhk-base__key zhk-base__key--space" onClick={() => handleSpecialKey(' ')}>
          <img src={keyboardSpace} className="zhk-base__key-icon" alt="Space" />
        </button>
        <button className="zhk-base__key" onClick={() => handleSpecialKey('。')}>
          。
        </button>
        <button className="zhk-base__key zhk-base__key--function" onClick={handleToggleLang}>
          <span className="zhk-base__toggle-main">{mode === 'zh' ? '中' : '英'}</span>
          <span className="zhk-base__toggle-sub">
            /
            {mode === 'zh' ? '英' : '中'}
          </span>
        </button>
        <button className="zhk-base__key zhk-base__key--function" onClick={() => handleSpecialKey('enter', true)}>
          <img src={keyboardReturn} className="zhk-base__key-icon" alt="Enter" />
        </button>
      </div>
    </div>
  )
}

export default KeyboardBase
