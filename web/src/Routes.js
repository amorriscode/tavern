import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />

      <Private unauthenticated="home">
        <Route path="/guild/create" page={CreateGuildPage} name="createGuild" />
        <Route path="/guild/{id}" page={GuildPage} name="guild" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/problem/{id:Int}" page={ProblemPage} name="problem" />
      </Private>

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
