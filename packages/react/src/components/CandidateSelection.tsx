import React from 'react'
import '../styles/CandidateSelection.scss'

interface CandidateSelectionProps {
  candidates: string[]
  onSelect: (index: number) => void
  onClose: () => void
}

const CandidateSelection: React.FC<CandidateSelectionProps> = ({ candidates, onSelect, onClose }) => {
  return (
    <div className="zhk-selection">
      <div className="zhk-selection__list">
        {candidates.map((candidate, index) => (
          <div key={candidate} className="zhk-selection__text" onClick={() => onSelect(index)}>
            {candidate}
          </div>
        ))}
      </div>
      <div className="zhk-selection__func">
        <button className="zhk-selection__func-btn" onClick={onClose}>
          返回
        </button>
      </div>
    </div>
  )
}

export default CandidateSelection
