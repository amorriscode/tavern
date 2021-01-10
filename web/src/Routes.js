import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/guild/create" page={CreateGuildPage} name="createGuild" />
      <Route path="/profile" page={ProfilePage} name="profile" />
      <Route path="/problem/{id:Int}" page={ProblemPage} name="problem" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
