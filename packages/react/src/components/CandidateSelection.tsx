import React from 'react'
import '../styles/CandidateList.scss'

interface CandidateSelectionProps {
  candidates: string[]
  onSelect: (candidate: string) => void
  onClose: () => void
}

const CandidateSelection: React.FC<CandidateSelectionProps> = ({ candidates, onSelect, onClose }) => {
  function selectCandidate(candidate: string) {
    onSelect(candidate)
  }

  function closeModal() {
    onClose()
  }

  return (
    <div className="zhk-selection">
      <div className="zhk-selection__list">
        {candidates.map(candidate => (
          <div key={candidate} className="zhk-selection__text" onClick={() => selectCandidate(candidate)}>
            {candidate}
          </div>
        ))}
      </div>
      <div className="zhk-selection__func">
        <button className="zhk-selection__func-btn" onClick={closeModal}>
          返回
        </button>
      </div>
    </div>
  )
}

export default CandidateSelection
