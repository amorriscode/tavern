import { navigate, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query CharacterLeaderboardQuery {
    topUsers {
      id
      name
      level
      guild {
        id
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ topUsers }) => {
  return (
    <div className="h-full">
      <h1 className="font-extrabold text-4xl text-gray-900 mb-2">Top Users</h1>
      <div className="space-y-4 bg-white p-8 rounded-sm border-2 border-brand-purple">
        <div className="grid grid-cols-3 font-bold text-xl">
          <div>User</div>
          <div className="text-center">Guild</div>
          <div className="text-right">Level</div>
        </div>

        <div className="divide-y divide-y-4">
          {topUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-3 text-xl py-4">
              <div
                onClick={() => navigate(routes.user({ id: user.id }))}
                className="hover:text-brand-pink hover:cursor-pointer"
              >
                {user.name}
              </div>

              <div className="text-center">{user?.guild?.name}</div>

              <div className="text-right">{user.level}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
