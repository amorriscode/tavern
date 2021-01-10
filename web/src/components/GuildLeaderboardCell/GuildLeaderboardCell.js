import { navigate, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query GuildLeaderboardQuery {
    topGuilds {
      id
      name
      experience
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ topGuilds }) => {
  return (
    <div className="h-full">
      <h1 className="font-extrabold text-4xl text-gray-900 mb-2">Top Guilds</h1>
      <div className="space-y-4 bg-white p-8 rounded-sm border-2 border-brand-purple">
        <div className="grid grid-cols-2 font-bold text-xl">
          <div>Guild</div>
          <div className="text-right">Experience</div>
        </div>

        <div className="divide-y divide-y-4">
          {topGuilds.map((guild) => (
            <div key={guild.id} className="grid grid-cols-2 text-xl py-4">
              <div
                onClick={() => navigate(routes.guild({ id: guild.id }))}
                className="hover:text-brand-pink hover:cursor-pointer"
              >
                {guild.name}
              </div>
              <div className="text-right">{guild.experience}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
