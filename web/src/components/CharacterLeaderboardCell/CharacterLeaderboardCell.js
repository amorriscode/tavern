import { navigate, routes } from '@redwoodjs/router'
import Character from 'src/components/Character'

export const QUERY = gql`
  query CharacterLeaderboardQuery {
    topUsers {
      id
      name
      experience
      guild {
        id
        name
      }
      outfit {
        skin
        head
        body
        ears
        eyes
        facial
        hair
        hairColour
        mouth
        neck
        nose
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
      <h1 className="font-extrabold text-4xl text-gray-900 mb-2">
        Top Characters
      </h1>

      <div className="space-y-4 bg-white p-8 rounded-sm border-2 border-brand-purple">
        <div className="grid grid-cols-3 font-bold text-xl">
          <div>Name</div>
          <div className="text-center">Guild</div>
          <div className="text-right">Experience</div>
        </div>

        <div className="divide-y divide-y-4">
          {topUsers.map((user) => (
            <div key={user.id} className="grid grid-cols-3 text-xl py-4">
              <div
                onClick={() => navigate(routes.user({ id: user.id }))}
                className="hover:text-brand-pink hover:cursor-pointer flex items-center"
              >
                <Character
                  id="me"
                  skin={user.outfit.skin}
                  size={25}
                  head={user.outfit.head}
                  body={user.outfit.body}
                  ear={user.outfit.ears}
                  eye={user.outfit.eyes}
                  facial={user.outfit.facial}
                  hair={user.outfit.hair}
                  hairColour={user.outfit.hairColour}
                  mouth={user.outfit.mouth}
                  neck={user.outfit.neck}
                  nose={user.outfit.nose}
                />

                <span className="ml-3">{user.name}</span>
              </div>

              <div
                className="text-center hover:text-brand-pink hover:cursor-pointer"
                onClick={() => navigate(routes.guild({ id: user?.guild?.id }))}
              >
                {user?.guild?.name}
              </div>

              <div className="text-right">{user.experience}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
