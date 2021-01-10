import { Link, routes, Redirect } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

import AppLayout from 'src/layouts/AppLayout'

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  if (isAuthenticated && currentUser) {
    if (!currentUser.outfit) {
      return <Redirect to={routes.finish()}></Redirect>
    }
  }

  return (
    <AppLayout>
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.js</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </AppLayout>
  )
}

export default HomePage
