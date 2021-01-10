import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'
import { IoMailOpenOutline, IoFingerPrintOutline } from 'react-icons/io5'
import { useMutation } from '@redwoodjs/web'

const SIGNUP_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const SignupForm = ({ onChangeForm, onAuthentication }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [signupUser] = useMutation(SIGNUP_USER)

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

      <form action="#">
        <div className="relative mb-2">
          <IoFingerPrintOutline className="absolute top-0 left-0 text-xl ml-3 mt-3" />

          <input
            type="Name"
            placeholder="Lord Mario Judah"
            required
            onChange={(e) => setName(e.target.value)}
            className="border rounded border-brand-purple bg-brand-white p-2 pl-10 w-full focus:border-brand-pink"
          />
        </div>

        <div className="relative">
          <IoMailOpenOutline className="absolute top-0 left-0 text-xl ml-3 mt-3" />

          <input
            type="email"
            placeholder="mj@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded border-brand-purple bg-brand-white p-2 pl-10 w-full focus:border-brand-pink"
          />
        </div>

        <button
          className=" bg-brand-purple text-brand-white hover:bg-opacity-75 hover:curser-pointer w-full mt-2 py-2 rounded justify-center"
          disabled={!email.length}
          onClick={async () => {
            await signUp({ email, showUI: true })

            signupUser({
              variables: {
                input: {
                  name,
                  email,
                },
              },
            })

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
