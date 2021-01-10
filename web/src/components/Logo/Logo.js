import { Link, routes } from '@redwoodjs/router'

const Logo = () => {
  return (
    <Link to={routes.home()}>
    <div className="select-none font-mono tracking-widest text-2xl">
      <span className="text-brand-green pr-1">{'>'}</span>tavern<span className="animate-blink text-brand-purple pr-1">{'|'}</span>
      <div className="font-mono text-brand-black tracking-wide text-xs">save the world from evil, bit by bit</div>
    </div>
    </Link>

  )
}

export default Logo
