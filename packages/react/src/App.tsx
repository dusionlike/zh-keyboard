import { useState } from 'react'
import ZhKeyboard from './components/ZhKeyboard'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [inputValueZh, setInputValueZh] = useState('')
  const [inputValueHand, setInputValueHand] = useState('')
  const [inputValueNum, setInputValueNum] = useState('')
  const [keyboardWidth, setKeyboardWidth] = useState(400)
  const [keyboardHeight, setKeyboardHeight] = useState(300)
  const [position, setPosition] = useState<'static' | 'float' | 'bottom'>(
    window.innerWidth < 960 ? 'bottom' : 'float',
  )
  const [disableWhenNoFocus, setDisableWhenNoFocus] = useState(true)

  const positionHints = {
    static: '键盘固定在页面中',
    float: '键盘将在点击输入框时显示',
    bottom: '键盘固定在屏幕底部',
  }

  return (
    <div className="root-container">
      <div className="container">
        <div className="header">
          <h1>中文虚拟键盘测试</h1>
        </div>

        <div className="input-grid">
          <div className="input-container">
            <label>英文输入:</label>
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              type="text"
              data-inputmode="en"
              inputMode="none"
              placeholder="点击这里使用英文输入"
            />
          </div>

          <div className="input-container">
            <label>中文拼音输入:</label>
            <input
              value={inputValueZh}
              onChange={e => setInputValueZh(e.target.value)}
              type="text"
              data-inputmode="zh"
              inputMode="none"
              placeholder="点击这里使用中文拼音"
            />
          </div>

          <div className="input-container">
            <label>手写输入:</label>
            <input
              value={inputValueHand}
              onChange={e => setInputValueHand(e.target.value)}
              type="text"
              data-inputmode="hand"
              inputMode="none"
              placeholder="点击这里使用手写"
            />
          </div>

          <div className="input-container">
            <label>数字输入:</label>
            <input
              value={inputValueNum}
              onChange={e => setInputValueNum(e.target.value)}
              type="text"
              data-inputmode="num"
              inputMode="none"
              placeholder="点击这里使用数字键盘"
            />
          </div>
        </div>

        <div className="controls">
          {position !== 'bottom' && (
            <>
              <label>键盘宽度: {keyboardWidth}px</label>
              <input
                value={keyboardWidth}
                onChange={e => setKeyboardWidth(Number(e.target.value))}
                type="range"
                min="400"
                max="1080"
                step="10"
                className="width-slider"
              />
              <label>键盘高度: {keyboardHeight}px</label>
              <input
                value={keyboardHeight}
                onChange={e => setKeyboardHeight(Number(e.target.value))}
                type="range"
                min="300"
                max="1000"
                step="10"
                className="width-slider"
              />
            </>
          )}

          <div className="checkbox-container">
            <div className="checkbox-item">
              <input
                id="disable-when-no-focus"
                checked={disableWhenNoFocus}
                onChange={e => setDisableWhenNoFocus(e.target.checked)}
                type="checkbox"
              />
              <label htmlFor="disable-when-no-focus">当无焦点时禁用键盘</label>
            </div>
          </div>

          <div className="position-container">
            <label>键盘定位方式:</label>
            <div className="radio-group">
              {Object.entries(positionHints).map(([key, hint]) => (
                <div key={key} className="radio-item">
                  <input
                    id={`pos-${key}`}
                    checked={position === key}
                    onChange={() => setPosition(key as 'static' | 'float' | 'bottom')}
                    type="radio"
                    value={key}
                    name="position"
                  />
                  <label htmlFor={`pos-${key}`}>{hint}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="keyboard-wrapper">
        <ZhKeyboard
          position={position}
          enableHandwriting
          disableWhenNoFocus={disableWhenNoFocus}
          style={position === 'bottom'
            ? { width: '100%', height: 'auto' }
            : { width: `${keyboardWidth}px`, height: `${keyboardHeight}px` }}
        />
      </div>
    </div>
  )
}

export default App
