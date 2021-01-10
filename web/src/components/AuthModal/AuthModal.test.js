import { render } from '@redwoodjs/testing'

import AuthModal from './AuthModal'

describe('AuthModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthModal />)
    }).not.toThrow()
  })
})
