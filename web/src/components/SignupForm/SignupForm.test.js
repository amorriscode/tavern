import { render } from '@redwoodjs/testing'

import SignupForm from './SignupForm'

describe('SignupForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupForm />)
    }).not.toThrow()
  })
})
