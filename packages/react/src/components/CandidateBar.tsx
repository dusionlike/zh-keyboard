import type { PinyinEngine } from '@zh-keyboard/core'
import type { KeyEvent } from '../types'
import { getKeyboardConfig, getPinyinEngine } from '@zh-keyboard/core'
import { createRimePinyinEngine } from '@zh-keyboard/pinyin'
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
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

const CandidateBar: React.FC<CandidateBarProps> = ({
  currentPinyin,
  onInput,
  setCurrentPinyin,
}) => {
  const engineRef = useRef<PinyinEngine | null>(null)
  const engineIsOwnedRef = useRef(false)
  const [engineReady, setEngineReady] = useState(false)
  const [candidates, setCandidates] = useState<string[]>([])
  const [isSelectionOpen, setIsSelectionOpen] = useState(false)

  const [segmentedPinyin, setSegmentedPinyin] = useState('')

  useLayoutEffect(() => {
    if (!currentPinyin) {
      setSegmentedPinyin('')
    }
  }, [currentPinyin])

  const showedPinyin = useMemo(() => segmentedPinyin || currentPinyin, [segmentedPinyin, currentPinyin])

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
  }, [])

  // 处理拼音变化
  useLayoutEffect(() => {
    const eng = engineRef.current
    if (!eng || !engineReady)
      return

    if (currentPinyin === '') {
      eng.clearInput()
      setCandidates([])
      return
    }

    (async () => {
      const result = await eng.processInput(currentPinyin)
      setCandidates(result.candidates)
      setSegmentedPinyin(result.segmentedPinyin)
    })()
  }, [currentPinyin, engineReady])

  async function handleSelection(globalIndex: number) {
    const eng = engineRef.current
    if (!eng)
      return

    const committed = await eng.pickCandidate(globalIndex)

    if (committed) {
      onInput(committed)
    }

    setCurrentPinyin('')
    setSegmentedPinyin('')
    setIsSelectionOpen(false)
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
}

export default CandidateBar
