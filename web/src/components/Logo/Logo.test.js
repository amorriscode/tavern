import { render } from '@redwoodjs/testing'

import Logo from './Logo'

describe('Logo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Logo />)
    }).not.toThrow()
  })
})
