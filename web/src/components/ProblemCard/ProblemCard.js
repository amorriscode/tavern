import { routes, navigate } from '@redwoodjs/router'
import { isPast } from 'date-fns'

import DifficultyPill from 'src/components/DifficultyPill'

const ProblemCard = ({ problem, assignedProblem }) => {
  const isPrevious = isPast(assignedProblem.createdAt)

  return (
    <div
      className="space-y-4 bg-white p-4 rounded-sm border-2 border-brand-purple w-full hover:cursor-pointer hover:bg-gray-100"
      onClick={() => navigate(routes.problem({ id: problem.id }))}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">{problem.name}</h2>

        <DifficultyPill difficulty={problem.difficulty} />
      </div>

      {isPrevious ? (
        ''
      ) : (
        <div className="h-6 flex items-end">
          {assignedProblem?.solved ? (
            'Solved'
          ) : (
            <div className="text-xs">
              {assignedProblem?.required || 1} more solutions required to unlock
              next quest
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProblemCard
