import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/leaderboard" page={LeaderboardPage} name="leaderboard" />
      <Route path="/" page={HomePage} name="home" />

      <Private unauthenticated="home">
        <Route path="/finish" page={FinishPage} name="finish" />
        <Route path="/guild/create" page={CreateGuildPage} name="createGuild" />
        <Route path="/guild/{id}" page={GuildPage} name="guild" />
        <Route path="/problem/{id:Int}" page={ProblemPage} name="problem" />
      </Private>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
