import type { KeyEvent } from '../types'
import type { RimeEngine } from '@zh-keyboard/pinyin'
import { createRimeEngine } from '@zh-keyboard/pinyin'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import chevronRight from '../assets/icons/chevron-right.svg'
import CandidateList from './CandidateList'
import CandidateSelection from './CandidateSelection'
import '../styles/CandidateBar.scss'

interface CandidateBarProps {
  currentPinyin: string
  onKey: (payload: KeyEvent) => void
  onInput: (text: string) => void
  setCurrentPinyin: (pinyin: string) => void
  wasmDir?: string
}

const CandidateBar: React.FC<CandidateBarProps> = ({ currentPinyin, onInput, setCurrentPinyin, wasmDir }) => {
  const engineRef = useRef<RimeEngine | null>(null)
  const [engineReady, setEngineReady] = useState(false)
  const [candidates, setCandidates] = useState<string[]>([])
  const [isSelectionOpen, setIsSelectionOpen] = useState(false)
  const prevPinyinRef = useRef('')

  useEffect(() => {
    let cancelled = false
    createRimeEngine({ wasmDir: wasmDir ?? '/rime' }).then((eng) => {
      if (!cancelled) {
        engineRef.current = eng
        setEngineReady(true)
      }
      else {
        eng.destroy()
      }
    })
    return () => {
      cancelled = true
      engineRef.current?.destroy()
      engineRef.current = null
      setEngineReady(false)
    }
  }, [wasmDir])

  useEffect(() => {
    const eng = engineRef.current
    if (!eng || !engineReady)
      return
    if (currentPinyin === '') {
      eng.clearInput()
      prevPinyinRef.current = ''
      setCandidates([])
      return
    }
    let state
    if (currentPinyin.startsWith(prevPinyinRef.current)) {
      // 追加新字符：只发送增量
      const delta = currentPinyin.slice(prevPinyinRef.current.length)
      state = eng.processInput(delta)
    }
    else {
      // 删除/修改：清空后重新输入
      eng.clearInput()
      state = eng.processInput(currentPinyin)
    }
    prevPinyinRef.current = currentPinyin
    setCandidates(state.candidates.map(c => c.text))
  }, [currentPinyin, engineReady])

  const visibleCandidates = useMemo(() => candidates.slice(0, 30), [candidates])

  function handleSelection(selected: string) {
    const eng = engineRef.current
    if (!eng)
      return
    const idx = candidates.indexOf(selected)
    if (idx !== -1)
      eng.pickCandidate(idx)
    eng.clearInput()
    prevPinyinRef.current = ''
    onInput(selected)
    setCurrentPinyin('')
    setIsSelectionOpen(false)
  }

  return (
    <div className="zhk-candidate">
      <div className="zhk-candidate__container">
        {currentPinyin && (
          <div className="zhk-candidate__pinyin">
            {currentPinyin}
          </div>
        )}
        <div className="zhk-candidate__bottom-container">
          {candidates.length > 0 && (
            <CandidateList
              candidates={visibleCandidates}
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
}

export default CandidateBar
