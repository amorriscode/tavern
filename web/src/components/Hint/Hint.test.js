import { render } from '@redwoodjs/testing'

import Hint from './Hint'

describe('Hint', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Hint />)
    }).not.toThrow()
  })
})
