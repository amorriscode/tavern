import { render } from '@redwoodjs/testing'

import Nav from './Nav'

describe('Nav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Nav />)
    }).not.toThrow()
  })
})
