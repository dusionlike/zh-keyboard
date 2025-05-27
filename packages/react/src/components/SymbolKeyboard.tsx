import type { KeyEvent } from '../types'
import React, { useMemo, useState } from 'react'
import lockOpenIconUrl from '../assets/icons/lock-open-outline.svg'
import lockClosedIconUrl from '../assets/icons/lock-outline.svg'
import '../styles/SymbolKeyboard.scss'

interface SymbolKeyboardProps {
  onKey: (payload: KeyEvent) => void
  onExit: () => void
}

const SymbolKeyboard: React.FC<SymbolKeyboardProps> = ({ onKey, onExit }) => {
  const enSymbolStr = '!@#$%^&*(){}[]<>/\\|:;"\',.,?+-=_~`€£¥₹©®™°'
  const zhSymbolStr = '！＠＃￥％…＆＊（）｛｝［］＜＞／＼｜：；＂＇，。？＋－＝＿～·€£¥₹©®™°'
  const [symbolType, setSymbolType] = useState('en')
  const currentSymbolStr = useMemo(() => (symbolType === 'zh' ? zhSymbolStr : enSymbolStr), [symbolType])
  const [isLocked, setIsLocked] = useState(false)

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
            >
              中文
            </button>
            <button
              className={`symbol-keyboard__lang-btn ${
                symbolType === 'en' ? 'symbol-keyboard__lang-btn--active' : ''
              }`}
              onClick={() => setSymbolType('en')}
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
                onClick={() => handleKeyPress(char)}
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
