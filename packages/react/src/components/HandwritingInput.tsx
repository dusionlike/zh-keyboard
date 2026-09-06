import type { KeyEvent } from '../types'
import { useElementSize } from '@reactuses/core'
import { CanvasDrawer, getHandwritingRecognizer, LatestTaskQueue } from '@zh-keyboard/core'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import keyboardBackspace from '../assets/icons/keyboard-backspace.svg'
import keyboardReturn from '../assets/icons/keyboard-return.svg'
import { useKeyRepeater } from '../hooks/useKeyRepeater'
import CandidateList from './CandidateList'
import '../styles/HandwritingInput.scss'

interface HandwritingInputProps {
  recognizerInitialized: boolean
  recognizerProgress: number
  onKey: (payload: KeyEvent) => void
  onExit: () => void
}

const HandwritingInput: React.FC<HandwritingInputProps> = ({ recognizerInitialized, recognizerProgress, onKey, onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasDrawer = useRef<CanvasDrawer | null>(null)
  const recognitionQueue = useRef(new LatestTaskQueue())
  const [candidates, setCandidates] = useState<string[]>([])

  const { startRepeat, stopRepeat } = useKeyRepeater()

  const recognizeStroke = useCallback(async () => {
    if (!canvasDrawer.current || canvasDrawer.current.getStrokeData().length === 0)
      return

    const recognizer = getHandwritingRecognizer()
    if (recognizer) {
      try {
        const strokeData = [...canvasDrawer.current.getStrokeData()]
        const results = await recognitionQueue.current.submit(() => recognizer.recognize(strokeData))
        if (results !== undefined) {
          setCandidates(results)
        }
      } catch (error) {
        console.error('识别笔迹失败:', error)
      }
    } else {
      console.warn('手写识别服务不可用')
    }
  }, [])

  useEffect(() => {
    const queue = recognitionQueue.current
    return () => {
      queue.clearPending()
    }
  }, [])

  const setupCanvas = useCallback(() => {
    if (!canvasRef.current)
      return

    if (canvasDrawer.current) {
      canvasDrawer.current.destroy()
    }

    canvasRef.current.width = canvasRef.current.clientWidth
    canvasRef.current.height = canvasRef.current.clientHeight

    canvasDrawer.current = new CanvasDrawer(canvasRef.current, {
      onDrawEnd: recognizeStroke,
    })
  }, [recognizeStroke])

  const [canvasWidth, canvasHeight] = useElementSize(canvasRef)

  useLayoutEffect(() => {
    if (canvasWidth && canvasHeight && recognizerInitialized) {
      setupCanvas()
      return () => {
        if (canvasDrawer.current) {
          canvasDrawer.current.destroy()
        }
      }
    }
  }, [canvasWidth, canvasHeight, recognizerInitialized, setupCanvas])

  function clearCanvas() {
    if (!canvasDrawer.current)
      return
    canvasDrawer.current.clearCanvas()
  }

  function handleSelection(index: number) {
    const candidate = candidates[index]
    if (!candidate)
      return
    onKey({ key: candidate })
    setCandidates([])
    clearCanvas()
  }

  function preventContextMenu(e: React.MouseEvent) {
    e.preventDefault()
  }

  return (
    <div className="handwriting-input">
      <CandidateList candidates={candidates} onSelect={handleSelection} />
      <div className="handwriting-content">
        <div className="handwriting-buttons">
          <button
            className="handwriting-btn handwriting-btn--function"
            onPointerDown={e => startRepeat(e, () => onKey({ key: '。' }))}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            onPointerCancel={stopRepeat}
            onContextMenu={preventContextMenu}
          >
            。
          </button>
          <button
            className="handwriting-btn handwriting-btn--function"
            onPointerDown={e => startRepeat(e, () => onKey({ key: '？' }))}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            onPointerCancel={stopRepeat}
            onContextMenu={preventContextMenu}
          >
            ？
          </button>
          <button
            className="handwriting-btn handwriting-btn--function"
            onPointerDown={e => startRepeat(e, () => onKey({ key: '！' }))}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            onPointerCancel={stopRepeat}
            onContextMenu={preventContextMenu}
          >
            ！
          </button>
          <button
            className="handwriting-btn handwriting-btn--function"
            onPointerDown={e => startRepeat(e, () => onKey({ key: '、' }))}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            onPointerCancel={stopRepeat}
            onContextMenu={preventContextMenu}
          >
            、
          </button>
        </div>
        <div className="handwriting-canvas-container">
          {!recognizerInitialized
            ? (
                <div className="handwriting-loading">
                  <div className="loading-text">
                    正在加载手写识别...
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${recognizerProgress * 100}%` }}></div>
                  </div>
                  <div className="progress-text">
                    {Math.round(recognizerProgress * 100)}%
                  </div>
                </div>
              )
            : (
                <canvas
                  ref={canvasRef}
                  className="handwriting-canvas"
                >
                </canvas>
              )}
        </div>
        <div className="handwriting-buttons">
          <button
            className="handwriting-btn handwriting-btn--function"
            onPointerDown={e => startRepeat(e, () => onKey({ key: 'delete', isControl: true }))}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            onPointerCancel={stopRepeat}
            onContextMenu={preventContextMenu}
          >
            <img src={keyboardBackspace} alt="删除" />
          </button>
          <button
            className="handwriting-btn handwriting-btn--function"
            onClick={onExit}
            onContextMenu={preventContextMenu}
          >
            拼音
          </button>
          <button
            className="handwriting-btn handwriting-btn--function"
            onPointerDown={e => startRepeat(e, () => onKey({ key: '，' }))}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            onPointerCancel={stopRepeat}
            onContextMenu={preventContextMenu}
          >
            ，
          </button>
          <button
            className="handwriting-btn handwriting-btn--function"
            onPointerDown={e => startRepeat(e, () => onKey({ key: 'enter', isControl: true }))}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            onPointerCancel={stopRepeat}
            onContextMenu={preventContextMenu}
          >
            <img src={keyboardReturn} alt="回车" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HandwritingInput
