import type { PinyinEngine, PinyinState } from '@zh-keyboard/core'
import type { KeyEvent } from '../types'
import { getKeyboardConfig, getPinyinEngine } from '@zh-keyboard/core'
import { createRimePinyinEngine } from '@zh-keyboard/pinyin'
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
  const engineIsOwnedRef = useRef(false)
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
    let cancelled = false

    const registered = getPinyinEngine()
    if (registered) {
      // 使用外部注册的引擎，不持有所有权
      engineRef.current = registered
      engineIsOwnedRef.current = false
      setEngineReady(true)
    } else {
      // 回退：创建默认 RIME 引擎
      const wasmDir = getKeyboardConfig().wasmDir ?? '/rime'
      createRimePinyinEngine({ wasmDir }).then((eng) => {
        if (!cancelled) {
          engineRef.current = eng
          engineIsOwnedRef.current = true
          setEngineReady(true)
          if (currentPinyin) {
            eng.processInput(currentPinyin).then(state => setPinyinState(state))
          }
        } else {
          eng.destroy()
        }
      })
    }

    return () => {
      cancelled = true
      if (engineIsOwnedRef.current) {
        engineRef.current?.destroy()
      }
      engineRef.current = null
      setEngineReady(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
