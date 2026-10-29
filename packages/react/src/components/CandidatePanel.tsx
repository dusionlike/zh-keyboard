import chevronRight from '../assets/icons/chevron-right.svg'
import CandidateList from './CandidateList'
import CandidateSelection from './CandidateSelection'
import '../styles/CandidateBar.scss'

interface CandidatePanelProps {
  candidates: string[]
  selectionCandidates?: string[]
  preedit?: string
  loading?: boolean
  loadingText?: string
  expanding?: boolean
  expanded?: boolean
  onSelect: (index: number) => void
  onExpand: () => void
  onClose: () => void
}

export default function CandidatePanel({
  candidates,
  selectionCandidates = candidates,
  preedit,
  loading = false,
  loadingText = '加载候选词中…',
  expanding = false,
  expanded = false,
  onSelect,
  onExpand,
  onClose,
}: CandidatePanelProps) {
  return (
    <div className="zhk-candidate">
      {loading
        ? (
            <div className="zhk-candidate__container zhk-candidate__container--loading">
              <span className="zhk-candidate__loading-text">{loadingText}</span>
            </div>
          )
        : (
            <>
              <div className="zhk-candidate__container">
                {preedit && <div className="zhk-candidate__pinyin">{preedit}</div>}
                <div className="zhk-candidate__bottom-container">
                  {candidates.length > 0 && <CandidateList candidates={candidates} onSelect={onSelect} />}
                  {candidates.length > 0 && (
                    <button
                      type="button"
                      className="zhk-candidate__more"
                      aria-label="展开全部候选词"
                      aria-expanded={expanded}
                      disabled={expanding}
                      onClick={onExpand}
                    >
                      <img src={chevronRight} alt="" />
                    </button>
                  )}
                </div>
              </div>
              {expanded && <CandidateSelection candidates={selectionCandidates} onSelect={onSelect} onClose={onClose} />}
            </>
          )}
    </div>
  )
}
