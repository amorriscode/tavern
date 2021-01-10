import { Link, routes, Redirect } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

import AppLayout from 'src/layouts/AppLayout'

import splash from 'src/images/splash.png'

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  if (isAuthenticated && currentUser) {
    if (!currentUser.outfit) {
      return <Redirect to={routes.finish()}></Redirect>
    }
  }

  return (
    <AppLayout>
      <div className=""></div>
      <h1 className="bg-white py-10 text-center font-semibold tracking-widest text-3xl">
        Welcome to Tavern! Ready for adventure?
      </h1>
      <img
        className="w-screen"
        src={splash}
        alt="Welcome to Tavern! Ready for adventure?"
      ></img>
    </AppLayout>
  )
}

export default HomePage
