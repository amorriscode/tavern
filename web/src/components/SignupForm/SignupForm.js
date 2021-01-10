import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'
import { IoMailOpenOutline } from 'react-icons/io5'

const SignupForm = ({ onChangeForm, onAuthentication }) => {
  const [email, setEmail] = useState('')

  const { signUp } = useAuth()

  return (
    <>
      <div className="text-4xl text-center">🧙🏽‍♂️</div>

      <div className="text-brand-purple font-bold text-center">
        Welcome new adventurer!
      </div>
      <div className="text-center text-sm mb-4">
        Ready to solve your first quest?
      </div>

      <form action="#" className="relative">
        <IoMailOpenOutline className="absolute top-0 left-0 text-xl ml-3 mt-3" />

        <input
          type="email"
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded border-brand-purple bg-brand-white p-2 pl-10 w-full"
        />

        <button
          className=" bg-brand-purple text-brand-white hover:bg-opacity-75 hover:curser-pointer w-full mt-2 py-2 rounded justify-center"
          disabled={!email.length}
          onClick={async () => {
            await signUp({ email, showUI: true })
            onAuthentication()
          }}
        >
          Sign Up
        </button>

        <div className="justify-center flex space-x-1 mt-2 text-sm">
          <div>Already have an account?</div>
          <div
            className="hover:text-brand-pink font-bold hover:cursor-pointer"
            onClick={() => onChangeForm('login')}
          >
            Log in!
          </div>
        </div>
      </form>
    </>
  )
}

export default SignupForm
