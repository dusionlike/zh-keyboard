import type { KeyEvent } from '../types'
import { useElementSize } from '@reactuses/core'
import { CanvasDrawer } from '@zh-keyboard/core'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import keyboardBackspace from '../assets/icons/keyboard-backspace.svg'
import keyboardReturn from '../assets/icons/keyboard-return.svg'
import { getHandwritingRecognizer } from '../utils/handwriting'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasDrawer = useRef<CanvasDrawer | null>(null)
  const isRecognizing = useRef(false)
  const [candidates, setCandidates] = useState<string[]>([])

  const recognizeStroke = useCallback(async () => {
    if (!canvasDrawer.current || canvasDrawer.current.getStrokeData().length === 0 || isRecognizing.current)
      return

    const recognizer = getHandwritingRecognizer()
    if (recognizer) {
      isRecognizing.current = true
      try {
        const strokeData = [...canvasDrawer.current.getStrokeData()]
        const results = await recognizer.recognize(strokeData)
        setCandidates(results)
      } catch (error) {
        console.error('识别笔迹失败:', error)
      } finally {
        isRecognizing.current = false
      }
    } else {
      console.warn('手写识别服务不可用')
    }
  }, [])

  const setupCanvas = useCallback(() => {
    if (!canvasRef.current)
      return

    if (canvasDrawer.current) {
      canvasDrawer.current.destroy()
    }

    canvasDrawer.current = new CanvasDrawer(canvasRef.current, {
      onDrawEnd: recognizeStroke,
    })
  }, [recognizeStroke])

  const [_, canvasSize] = useElementSize(containerRef)

  useLayoutEffect(() => {
    if (canvasSize && recognizerInitialized) {
      setupCanvas()
      return () => {
        if (canvasDrawer.current) {
          canvasDrawer.current.destroy()
        }
      }
    }
  }, [canvasSize, recognizerInitialized, setupCanvas])

  function clearCanvas() {
    if (!canvasDrawer.current)
      return
    canvasDrawer.current.clearCanvas()
  }

  function handleSelection(candidate: string) {
    onKey({ key: candidate })
    setCandidates([])
    clearCanvas()
  }

  return (
    <div className="handwriting-input">
      <CandidateList candidates={candidates} onSelect={handleSelection} />
      <div ref={containerRef} className="handwriting-content">
        {canvasSize
          ? (
              <>
                <div className="handwriting-buttons">
                  <button className="handwriting-btn handwriting-btn--function" onClick={() => onKey({ key: '。' })}>
                    。
                  </button>
                  <button className="handwriting-btn handwriting-btn--function" onClick={() => onKey({ key: '？' })}>
                    ？
                  </button>
                  <button className="handwriting-btn handwriting-btn--function" onClick={() => onKey({ key: '！' })}>
                    ！
                  </button>
                  <button className="handwriting-btn handwriting-btn--function" onClick={() => onKey({ key: '、' })}>
                    、
                  </button>
                </div>
                <div className="handwriting-canvas-container">
                  {!recognizerInitialized
                    ? (
                        <div
                          className="handwriting-loading"
                          style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}
                        >
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
                          width={canvasSize}
                          height={canvasSize}
                        >
                        </canvas>
                      )}
                </div>
                <div className="handwriting-buttons">
                  <button className="handwriting-btn handwriting-btn--function" onClick={() => onKey({ key: 'delete', isControl: true })}>
                    <img src={keyboardBackspace} alt="删除" />
                  </button>
                  <button className="handwriting-btn handwriting-btn--function" onClick={onExit}>
                    返回
                  </button>
                  <button className="handwriting-btn handwriting-btn--function" onClick={() => onKey({ key: '，' })}>
                    ，
                  </button>
                  <button className="handwriting-btn handwriting-btn--function" onClick={() => onKey({ key: 'enter', isControl: true })}>
                    <img src={keyboardReturn} alt="回车" />
                  </button>
                </div>
              </>
            )
          : null}
      </div>
    </div>
  )
}

export default HandwritingInput
