import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

import Modal from 'src/components/Modal'
import LoginForm from 'src/components/LoginForm'
import SignupForm from '../SignupForm/SignupForm'

const formOptions = { login: LoginForm, signup: SignupForm }

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentForm, setCurrentForm] = useState('login')
  const { logOut, isAuthenticated } = useAuth()

  const Form = formOptions[currentForm]

  const handleAuth = async () => {
    if (!isAuthenticated) {
      setIsOpen(true)
    } else {
      await logOut()
    }
  }

  return (
    <>
      <div
        onClick={handleAuth}
        className="rounded-sm px-3 py-1 bg-brand-purple text-brand-white hover:bg-opacity-75 hover:cursor-pointer"
      >
        {isAuthenticated ? 'Log Out' : 'Log In'}
      </div>

      <Modal open={isOpen} onModalClose={() => setIsOpen(false)}>
        <Form
          onChangeForm={(formOption) => {
            setCurrentForm(formOption)
          }}
          onAuthentication={() => setIsOpen(false)}
        />
      </Modal>
    </>
  )
}

export default AuthModal
