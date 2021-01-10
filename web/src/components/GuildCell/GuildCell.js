import { navigate, routes } from '@redwoodjs/router'
import { isPast, formatDistanceToNow } from 'date-fns'

import ProblemCard from 'src/components/ProblemCard'

export const QUERY = gql`
  query GuildQuery($id: String!) {
    guild(id: $id) {
      id
      name
      experience
      createdAt
      users {
        id
        name
        experience
      }
      assignedProblems {
        createdAt
        required
        remaining
        solved
        problem {
          id
          name
          difficulty {
            name
            color
          }
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ guild }) => {
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)

  const activeQuests = guild?.assignedProblems.filter(
    (assignedProblem) => !isPast(assignedProblem.createdAt)
  )

  const previousQuests = guild?.assignedProblems.filter((assignedProblem) =>
    isPast(assignedProblem.createdAt)
  )

  return (
    <div className="container mx-auto mt-8 grid grid-cols-4 gap-12">
      <div className="text-gray-900 mb-8 col-span-2 col-start-2 row-span-1 flex justify-between items-center">
        <h1 className="font-extrabold text-4xl">{guild.name}</h1>

        <div className="text-2xl font-extrabold">{guild.experience} XP</div>
      </div>

      <div className="space-y-12 col-span-2 col-start-2">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-extrabold text-2xl text-gray-900">Quests</h2>

            <div className="text-xs">
              Next challenge in{' '}
              {formatDistanceToNow(midnight, {
                includeSeconds: true,
              })}
            </div>
          </div>

          {activeQuests.length ? (
            activeQuests.map((assignedProblem) => (
              <ProblemCard
                key={assignedProblem.problem.id}
                problem={assignedProblem.problem}
                assignedProblem={assignedProblem}
              />
            ))
          ) : (
            <div>Come back tomorrow for a more quests!</div>
          )}
        </div>

        {!!previousQuests.length && (
          <div>
            <h2 className="font-extrabold text-2xl text-gray-900 mb-1">
              Solved Quests
            </h2>

            {previousQuests.map((assignedProblem) => (
              <ProblemCard
                key={assignedProblem.problem.id}
                problem={assignedProblem.problem}
                assignedProblem={assignedProblem}
              />
            ))}
          </div>
        )}
      </div>

      <div className="col-span-1">
        <h2 className="font-extrabold text-2xl text-gray-900 mb-1">
          Characters
        </h2>

        <div className="space-y-2 bg-white p-4 rounded-sm border-2 border-brand-purple">
          <div className="grid grid-cols-2 font-bold text-xl">
            <div>Name</div>
            <div className="text-right">Experience</div>
          </div>

          <div className="divide-y divide-y-2">
            {guild?.users.map((user) => (
              <div key={user.id} className="grid grid-cols-2 text-xl py-2">
                <div
                  onClick={() => navigate(routes.user({ id: user.id }))}
                  className="hover:text-brand-pink hover:cursor-pointer"
                >
                  {user.name}
                </div>

                <div className="text-right">{user.experience}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
