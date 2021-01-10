import AppLayout from 'src/layouts/AppLayout'
import GuildLeaderboardCell from 'src/components/GuildLeaderboardCell'
import CharacterLeaderboardCell from 'src/components/CharacterLeaderboardCell'

const LeaderboardPage = () => {
  return (
    <AppLayout>
      <div className="grid grid-cols-2 gap-12 container mx-auto my-8">
        <GuildLeaderboardCell />
        <CharacterLeaderboardCell />
      </div>
    </AppLayout>
  )
}

export default LeaderboardPage
