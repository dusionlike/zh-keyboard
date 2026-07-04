import type { PinyinEngine, PinyinState } from '@zh-keyboard/core'
import type { KeyEvent } from '../types'
import { getPinyinEngine } from '@zh-keyboard/core'
import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'
import chevronRight from '../assets/icons/chevron-right.svg'
import CandidateList from './CandidateList'
import CandidateSelection from './CandidateSelection'
import '../styles/CandidateBar.scss'

interface CandidateBarProps {
  currentPinyin: string
  onKey: (payload: KeyEvent) => void
  onInput: (text: string) => void
  setCurrentPinyin: (pinyin: string) => void
}

export interface CandidateBarRef {
  handleSelection: (globalIndex: number) => Promise<void>
}

const CandidateBar = forwardRef<CandidateBarRef, CandidateBarProps>(({
  currentPinyin,
  onInput,
  setCurrentPinyin,
}, ref) => {
  const engineRef = useRef<PinyinEngine | null>(null)
  const [engineLoading, setEngineLoading] = useState(true)
  const [pinyinState, setPinyinState] = useState<PinyinState | null>(null)
  const [isSelectionOpen, setIsSelectionOpen] = useState(false)

  const candidates = useMemo(() => pinyinState?.candidates.map(c => c.text) ?? [], [pinyinState])

  const showedPinyin = useMemo(() => {
    if (!pinyinState)
      return ''
    return pinyinState.preeditHead + pinyinState.preeditBody
  }, [pinyinState])

  useImperativeHandle(ref, () => ({
    handleSelection,
  }))

  // 初始化引擎（仅执行一次）
  useLayoutEffect(() => {
    const engine = getPinyinEngine()
    if (!engine) {
      throw new Error('未找到拼音引擎实例，请确保已正确注册引擎')
    }

    engineRef.current = engine
    setEngineLoading(true)

    // 等待引擎真正就绪
    ;(async () => {
      try {
        await engine.whenReady?.()
      } catch (e) {
        console.error('拼音引擎就绪失败:', e)
      }
      setEngineLoading(false)
    })()

    return () => {
      engineRef.current?.syncData?.()
      engineRef.current?.processInput('')?.catch(() => {})
      setEngineLoading(true)
    }
  }, [])

  // 处理拼音变化
  useLayoutEffect(() => {
    const eng = engineRef.current
    if (!eng || engineLoading)
      return

    if (currentPinyin === '') {
      eng.processInput('')?.catch(() => {})
      setPinyinState(null)
      return
    }

    ;(async () => {
      const state = await eng.processInput(currentPinyin)
      setPinyinState(state)
    })()
  }, [currentPinyin, engineLoading])

  async function handleSelection(globalIndex: number) {
    const eng = engineRef.current
    if (!eng)
      return

    const state = await eng.pickCandidate(globalIndex)
    setPinyinState(state)

    if (!state.preeditBody) {
      onInput(state.committed || '')
      setCurrentPinyin('')
      setPinyinState(null)
      setIsSelectionOpen(false)
    }
  }

  if (engineLoading) {
    return (
      <div className="zhk-candidate">
        <div className="zhk-candidate__container zhk-candidate__container--loading">
          <span className="zhk-candidate__loading-text">加载拼音引擎中…</span>
        </div>
      </div>
    )
  }

  return (
    <div className="zhk-candidate">
      <div className="zhk-candidate__container">
        {showedPinyin && (
          <div className="zhk-candidate__pinyin">
            {showedPinyin}
          </div>
        )}
        <div className="zhk-candidate__bottom-container">
          {candidates.length > 0 && (
            <CandidateList
              candidates={candidates}
              onSelect={handleSelection}
            />
          )}
          {candidates.length > 0 && (
            <button
              className="zhk-candidate__more"
              onClick={() => setIsSelectionOpen(true)}
            >
              <img src={chevronRight} alt="更多" />
            </button>
          )}
        </div>
      </div>
      {isSelectionOpen && (
        <CandidateSelection
          candidates={candidates}
          onSelect={handleSelection}
          onClose={() => setIsSelectionOpen(false)}
        />
      )}
    </div>
  )
})

export default CandidateBar
