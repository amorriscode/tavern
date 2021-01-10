import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'
import { IoMailOpenOutline } from 'react-icons/io5'

const LoginForm = ({ onChangeForm, onAuthentication }) => {
  const [email, setEmail] = useState('')

  const { logIn } = useAuth()

  return (
    <>
      <div className="text-4xl text-center">🧙🏽‍♂️</div>

      <div className="text-brand-purple font-bold text-center">
        Greetings, fellow adventurer!
      </div>

      <div className="text-center text-sm mb-4">
        Ready to solve your next quest?
      </div>

      <form action="#">
        <div className="relative">
          <IoMailOpenOutline className="absolute top-0 left-0 text-xl ml-3 mt-3" />

          <input
            type="email"
            placeholder="mj@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-sm border-brand-purple bg-brand-white p-2 pl-10 w-full focus:border-brand-pink"
          />
        </div>

        <button
          className=" bg-brand-purple text-brand-white hover:bg-opacity-75 hover:cursor-pointer w-full mt-2 py-2 rounded-sm justify-center"
          disabled={!email.length}
          onClick={async () => {
            await logIn({ email, showUI: true })
            onAuthentication()
          }}
        >
          Log In
        </button>

        <div className="justify-center flex space-x-1 mt-2 text-sm">
          <div>Don&apos;t have an account?</div>
          <div
            className="hover:text-brand-pink font-bold hover:cursor-pointer"
            onClick={() => onChangeForm('signup')}
          >
            Sign up!
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginForm
