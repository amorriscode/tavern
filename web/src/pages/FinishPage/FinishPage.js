import { routes, Redirect } from '@redwoodjs/router'
import AppLayout from 'src/layouts/AppLayout'
import { useAuth } from '@redwoodjs/auth'
import RandomCharacter from '../../components/RandomCharacter'
import { useState } from 'react'

const FinishPage = () => {
  const { currentUser, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Redirect to={routes.home()}></Redirect>
  }

  let part
  if (!currentUser.outfit) {
    part = SetCharacter()
  } else if (!currentUser.name) {
    part = SetName()
  } else {
    return <Redirect to={routes.home()}></Redirect>
  }

  return <AppLayout>{part}</AppLayout>
}

const SetCharacter = () => {
  let [characters, setCharacters] = useState([
    <RandomCharacter key="1" />,
    <RandomCharacter key="2" />,
    <RandomCharacter key="3" />,
  ])

  const randomize = () => {
    setCharacters([
      <RandomCharacter
        key={Math.random().toString(36).substring(7).replace(/[0-9]/g, '')}
      />,
      <RandomCharacter
        key={Math.random().toString(36).substring(7).replace(/[0-9]/g, '')}
      />,
      <RandomCharacter
        key={Math.random().toString(36).substring(7).replace(/[0-9]/g, '')}
      />,
    ])
  }

  return (
    <>
      <div className="flex p-20 px-30 pb-10 w-full justify-center flex-col">
        <h1 className="text-3xl font-bold">
          You're almost ready to save the world!
        </h1>
        <p>
          All that's left is to pick your character!{' '}
          <span className="text-gray-500">
            (Don't worry, you can customize your character later)
          </span>
        </p>
      </div>
      <div className="flex p-4 w-full justify-center">{characters}</div>
      <div className="flex w-3/4 justify-end">
        <button
          onClick={() => randomize()}
          className="bg-gray-800 hover:bg-opacity-75 text-white px-3 py-1 rounded mt-2"
        >
          Randomize choices
        </button>
      </div>
    </>
  )
}

const SetName = () => {
  return (
    <>
      <h1 className="text-2xl">Outfit Selection</h1>
    </>
  )
}

export default FinishPage
