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
  const [engineReady, setEngineReady] = useState(false)
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
    if (engine) {
      // 使用外部注册的引擎，不持有所有权
      engineRef.current = engine
      setEngineReady(true)
    } else {
      throw new Error('未找到拼音引擎实例，请确保已正确注册引擎')
    }

    return () => {
      engineRef.current?.clearInput()
      setEngineReady(false)
    }
  }, [])

  // 处理拼音变化
  useLayoutEffect(() => {
    const eng = engineRef.current
    if (!eng || !engineReady)
      return

    if (currentPinyin === '') {
      eng.clearInput()
      setPinyinState(null)
      return
    }

    (async () => {
      const state = await eng.processInput(currentPinyin)
      setPinyinState(state)
    })()
  }, [currentPinyin, engineReady])

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
