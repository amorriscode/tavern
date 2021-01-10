import { Link, routes } from '@redwoodjs/router'

import Logo from 'src/components/Logo'
import AuthModal from 'src/components/AuthModal'
import { useAuth } from '@redwoodjs/auth'
import Character from 'src/components/Character'

const Nav = () => {
  const { currentUser } = useAuth()

  let profilePicture = <div></div>
  if (currentUser && currentUser.outfit) {
    const outfit = currentUser.outfit
    profilePicture = (
      <Character
        id="me"
        skin={outfit.skin}
        size={33}
        head={outfit.head}
        body={outfit.body}
        ear={outfit.ears}
        eye={outfit.eyes}
        facial={outfit.facial}
        hair={outfit.hair}
        hairColour={outfit.hairColour}
        mouth={outfit.mouth}
        neck={outfit.neck}
        nose={outfit.nose}
      />
    )
  }

  return (
    <nav className="flex justify-between p-4 border-b-2 border-brand-purple">
      <div className="w-1/2">
        <Logo />

        <div className="font-mono text-brand-black tracking-wide text-xs">
          save the world from evil, bit by bit
        </div>
      </div>

      <div className="w-1/2 space-x-4 flex justify-end items-center">
        <Link to={routes.home()}>Guild</Link>

        <Link to={routes.home()}>Leaderboard</Link>

        {profilePicture}
        <AuthModal />
      </div>
    </nav>
  )
}

export default Nav

//auth modal: has modal in it  modal
