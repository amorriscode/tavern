import { Link, routes } from '@redwoodjs/router'

import Logo from 'src/components/Logo'
import AuthModal from 'src/components/AuthModal'

const Nav = () => {
  return (
    <nav className="flex justify-between p-4 border-b-2 border-brand-purple">
      <div className="w-1/2">
        <Logo />

        <div className="font-mono text-brand-black tracking-wide text-xs">
          save the world from evil, bit by bit
        </div>
      </div>

      <div className="w-1/2 space-x-4 flex justify-end items-center">
        <Link to={routes.profile()}>Character Sheet</Link>

        <Link to={routes.home()}>Guild</Link>

        <Link to={routes.leaderboard()}>Leaderboard</Link>

        <Link to={routes.home()}>Settings</Link>

        <AuthModal />
      </div>
    </nav>
  )
}

export default Nav

//auth modal: has modal in it  modal
