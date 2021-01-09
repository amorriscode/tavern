import { Link, routes } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'

const HomePage = () => {
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
