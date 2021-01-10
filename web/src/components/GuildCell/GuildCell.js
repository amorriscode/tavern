import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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

  return (
    <div className="container mx-auto mt-8 grid grid-cols-4 gap-8">
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

          {guild?.assignedProblems.map(({ problem }) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>

        <div>
          <h2 className="font-extrabold text-2xl text-gray-900 mb-1">
            Solved Quests
          </h2>

          {guild?.assignedProblems.map(({ problem }) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>

      <div className="mb-4 col-span-1">
        <h2 className="font-extrabold text-2xl text-gray-900 mb-1">
          Characters
        </h2>

        <div>
          {guild?.users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
