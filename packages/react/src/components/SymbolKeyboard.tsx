import type { KeyEvent } from '../types'
import React, { useMemo, useState } from 'react'
import lockOpenIconUrl from '../assets/icons/lock-open-outline.svg'
import lockClosedIconUrl from '../assets/icons/lock-outline.svg'
import { useKeyRepeater } from '../hooks/useKeyRepeater'
import '../styles/SymbolKeyboard.scss'

interface SymbolKeyboardProps {
  onKey: (payload: KeyEvent) => void
  onExit: () => void
}

const SymbolKeyboard: React.FC<SymbolKeyboardProps> = ({ onKey, onExit }) => {
  const enSymbolStr = '!@#$%^&*(){}[]<>/\\|:;"\',.?+-=_~`€£¥₹©®™°'
  const zhSymbolStr = '！＠＃￥％…＆＊（）｛｝［］＜＞／＼｜：；＂＇，。？＋－＝＿～·€£¥₹©®™°'
  const [symbolType, setSymbolType] = useState('en')
  const currentSymbolStr = useMemo(() => (symbolType === 'zh' ? zhSymbolStr : enSymbolStr), [symbolType])
  const [isLocked, setIsLocked] = useState(false)

  const { startRepeat, stopRepeat } = useKeyRepeater()

  function handleKeyPress(key: string) {
    onKey({ key })
    if (!isLocked) {
      onExit()
    }
  }

  function goBack() {
    onExit()
  }

  function toggleLock() {
    setIsLocked(!isLocked)
  }

  function preventContextMenu(e: React.MouseEvent) {
    e.preventDefault()
  }

  function onSymbolDown(char: string, e: React.PointerEvent) {
    if (!isLocked) {
      return
    }
    startRepeat(e, () => handleKeyPress(char))
  }

  return (
    <div className="symbol-keyboard">
      <div className="symbol-keyboard__content">
        <div className="symbol-keyboard__functions">
          <div className="symbol-keyboard__lang-selector">
            <button
              type="button"
              className={`symbol-keyboard__lang-btn ${
                symbolType === 'zh' ? 'symbol-keyboard__lang-btn--active' : ''
              }`}
              onClick={() => setSymbolType('zh')}
              onContextMenu={preventContextMenu}
            >
              中文
            </button>
            <button
              className={`symbol-keyboard__lang-btn ${
                symbolType === 'en' ? 'symbol-keyboard__lang-btn--active' : ''
              }`}
              onClick={() => setSymbolType('en')}
              onContextMenu={preventContextMenu}
            >
              英文
            </button>
          </div>
          <div className="symbol-keyboard__control-group">
            <button
              className={`symbol-keyboard__key symbol-keyboard__key--function symbol-keyboard__key--lock ${
                isLocked ? 'symbol-keyboard__key--locked' : ''
              }`}
              onClick={toggleLock}
              onContextMenu={preventContextMenu}
            >
              {!isLocked
                ? (
                    <img src={lockOpenIconUrl} alt="Lock open" />
                  )
                : (
                    <img src={lockClosedIconUrl} alt="Lock closed" />
                  )}
            </button>
            <button
              className="symbol-keyboard__key symbol-keyboard__key--function symbol-keyboard__key--back"
              onClick={goBack}
              onContextMenu={preventContextMenu}
            >
              返回
            </button>
          </div>
        </div>

        <div className="symbol-keyboard__symbols-container">
          <div className="symbol-keyboard__symbols-grid">
            {currentSymbolStr.split('').map(char => (
              <button
                key={`key-${char}`}
                className="symbol-keyboard__key"
                onClick={() => !isLocked && handleKeyPress(char)}
                onPointerDown={e => onSymbolDown(char, e)}
                onPointerUp={stopRepeat}
                onPointerLeave={stopRepeat}
                onPointerCancel={stopRepeat}
                onContextMenu={preventContextMenu}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymbolKeyboard
