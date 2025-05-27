import type { KeyEvent } from '../types'
import { AdvancedPinyinEngine } from '@zh-keyboard/core'
import React, { useEffect, useMemo, useState } from 'react'
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

const CandidateBar: React.FC<CandidateBarProps> = ({ currentPinyin, onInput, setCurrentPinyin }) => {
  const inputEngine = useMemo(() => new AdvancedPinyinEngine(), [])
  const [candidates, setCandidates] = useState<string[]>([])
  const [isSelectionOpen, setIsSelectionOpen] = useState(false)

  useEffect(() => {
    async function processInput() {
      setCandidates(await inputEngine.processInput(currentPinyin))
    }
    processInput()
  }, [currentPinyin, inputEngine])

  const visibleCandidates = useMemo(() => candidates.slice(0, 30), [candidates])

  function handleSelection(selected: string) {
    inputEngine.selectCandidate(selected)
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
