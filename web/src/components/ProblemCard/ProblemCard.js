import { useState } from 'react'
import { RiBracesLine } from 'react-icons/ri'
import { routes, navigate } from '@redwoodjs/router'

import DifficultyPill from 'src/components/DifficultyPill'

const ProblemCard = ({ problem }) => {
  const [showStatus, setShowStatus] = useState(false)

  return (
    <div
      className="space-y-4 bg-white p-4 rounded-sm border-2 border-brand-purple w-full hover:cursor-pointer hover:bg-gray-100"
      onClick={() => navigate(routes.problem({ id: problem.id }))}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">{problem.name}</h2>

        <DifficultyPill difficulty={problem.difficulty} />
      </div>

      <div
        className="h-6 flex items-end"
        onMouseEnter={() => setShowStatus(true)}
        onMouseLeave={() => setShowStatus(false)}
      >
        {showStatus ? (
          <div className="text-xs">
            2 more solutions required to unlock next level
          </div>
        ) : (
          <div className="flex space-x-2" title="1 out of 3 required solutions">
            {[1, 2, 3].map((solution, i) => (
              <RiBracesLine
                key={i}
                className={`${
                  i === 0 ? 'text-brand-green' : 'text-gray-700'
                } text-2xl`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProblemCard
