import { Link, routes } from '@redwoodjs/router'

import Logo from 'src/components/Logo'

const Nav = () => {
  return (
    <div className="flex justify-between p-4 border-b-2 border-brand-purple mb-4">
      <div className="w-1/2">
        <Logo />
      </div>

      <div className="w-1/2 space-x-4 text-right pt-3">
          <Link to={routes.home()}>Character Sheet</Link>

          <Link to={routes.home()}>Guild</Link>

          <Link to={routes.home()}>Leaderboard</Link>

          <Link to={routes.home()}>Settings</Link>
      </div>
    </div>
  )
}

export default Nav
