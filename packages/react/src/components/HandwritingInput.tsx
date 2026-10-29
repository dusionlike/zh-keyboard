import type { KeyEvent } from '../types'
import { CanvasDrawer, getHandwritingRecognizer, HandwritingSession, InputComposition, LatestTaskQueue } from '@zh-keyboard/core'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import keyboardBackspace from '../assets/icons/keyboard-backspace.svg'
import keyboardReturn from '../assets/icons/keyboard-return.svg'
import { useKeyRepeater } from '../hooks/useKeyRepeater'
import CandidatePanel from './CandidatePanel'
import '../styles/HandwritingInput.scss'

interface HandwritingInputProps {
  recognizerInitialized: boolean
  handwritingDelay: number
  inputElement: HTMLInputElement | null
  onKey: (payload: KeyEvent) => void
  onExit: () => void
}

const HandwritingInput: React.FC<HandwritingInputProps> = ({ recognizerInitialized, handwritingDelay, inputElement, onKey, onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasDrawer = useRef<CanvasDrawer | null>(null)
  const handwritingSession = useRef<HandwritingSession | null>(null)
  const recognitionQueue = useRef(new LatestTaskQueue())
  const onKeyRef = useRef(onKey)
  const inputRef = useRef(inputElement)
  const composition = useRef<InputComposition | null>(null)
  if (!composition.current) {
    composition.current = new InputComposition({
      onConfirm: () => handwritingSession.current?.select(0),
      onCancel: () => handwritingSession.current?.reset(),
    })
  }
  const delayRef = useRef(handwritingDelay)
  onKeyRef.current = onKey
  inputRef.current = inputElement
  delayRef.current = handwritingDelay
  const [candidates, setCandidates] = useState<string[]>([])
  const [isSelectionOpen, setIsSelectionOpen] = useState(false)

  const { startRepeat, stopRepeat } = useKeyRepeater()

  const setupCanvas = useCallback(() => {
    if (!canvasRef.current)
      return

    if (canvasDrawer.current) {
      canvasDrawer.current.destroy()
    }
    handwritingSession.current?.dispose()

    canvasRef.current.width = canvasRef.current.clientWidth
    canvasRef.current.height = canvasRef.current.clientHeight

    let drawer: CanvasDrawer
    const session = new HandwritingSession({
      queue: recognitionQueue.current,
      recognize: strokeData => getHandwritingRecognizer()?.recognize(strokeData) ?? Promise.resolve([]),
      onCandidates: (results) => {
        setCandidates(results)
        if (results.length === 0)
          setIsSelectionOpen(false)
      },
      onPreview: candidate => composition.current?.update(inputRef.current, candidate),
      onCommit: candidate => composition.current?.commit(candidate, () => onKeyRef.current({ key: candidate })),
      onClear: () => drawer.clearCanvas(),
      onError: error => console.error('识别笔迹失败:', error),
      getTarget: () => document.activeElement,
    })
    drawer = new CanvasDrawer(canvasRef.current, {
      clearDelay: delayRef.current,
      onDrawStart: () => session.startStroke(),
      onDrawEnd: () => void session.recognize([...drawer.getStrokeData()]),
      onIdle: () => void session.finish(),
    })
    canvasDrawer.current = drawer
    handwritingSession.current = session
    setCandidates([])
    setIsSelectionOpen(false)
  }, [])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !recognizerInitialized)
      return

    setupCanvas()
    // The canvas mounts after model initialization; observe the actual element.
    const observer = new ResizeObserver(() => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        setupCanvas()
      }
    })
    observer.observe(canvas)
    return () => {
      observer.disconnect()
      canvasDrawer.current?.destroy()
      handwritingSession.current?.dispose()
    }
  }, [recognizerInitialized, setupCanvas])

  useLayoutEffect(() => {
    canvasDrawer.current?.setClearDelay(handwritingDelay)
  }, [handwritingDelay])

  useLayoutEffect(() => {
    handwritingSession.current?.reset()
  }, [inputElement])

  function handleSelection(index: number) {
    handwritingSession.current?.select(index)
  }

  function preventContextMenu(e: React.MouseEvent) {
    e.preventDefault()
  }

  return (
    <div className="handwriting-input">
      <CandidatePanel
        candidates={candidates}
        expanded={isSelectionOpen}
        onSelect={handleSelection}
        onExpand={() => setIsSelectionOpen(true)}
        onClose={() => setIsSelectionOpen(false)}
      />
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
