import React from 'react'
import '../styles/CandidateList.scss'

interface CandidateListProps {
  candidates: string[]
  onSelect: (candidate: string) => void
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates, onSelect }) => {
  function handleSelect(candidate: string) {
    onSelect(candidate)
  }

  return (
    <div className="zhk-candidate-list">
      {candidates.map(candidate => (
        <button
          key={`candidate-${candidate}`}
          className="zhk-candidate-list__item"
          onClick={() => handleSelect(candidate)}
        >
          {candidate}
        </button>
      ))}
    </div>
  )
}

export default CandidateList
