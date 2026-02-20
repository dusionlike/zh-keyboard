import React from 'react'
import '../styles/CandidateList.scss'

interface CandidateListProps {
  candidates: string[]
  onSelect: (index: number) => void
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates, onSelect }) => {
  return (
    <div className="zhk-candidate-list">
      {candidates.map((candidate, index) => (
        <button
          key={candidate}
          className="zhk-candidate-list__item"
          onClick={() => onSelect(index)}
        >
          {candidate}
        </button>
      ))}
    </div>
  )
}

export default CandidateList
