import { NavLink, routes } from '@redwoodjs/router'

import Logo from 'src/components/Logo'
import AuthModal from 'src/components/AuthModal'
import { useAuth } from '@redwoodjs/auth'
import Character from 'src/components/Character'

const Nav = () => {
  const { currentUser } = useAuth()

  let profilePicture = <div></div>
  if (currentUser?.outfit) {
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

      <div className="w-1/2 space-x-8 flex justify-end items-center">
        <NavLink
          to={routes.guild({ id: currentUser?.guild?.id })}
          activeClassName="text-brand-pink"
          className="hover:text-brand-pink"
        >
          Guild
        </NavLink>

        <NavLink to={routes.leaderboard()} className="hover:text-brand-pink">
          Leaderboard
        </NavLink>

        <div className="flex justify-center items-center">{profilePicture}</div>

        <AuthModal />
      </div>
    </nav>
  )
}

export default Nav

//auth modal: has modal in it  modal
