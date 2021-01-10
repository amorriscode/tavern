import { render } from '@redwoodjs/testing'

import Example from './Example'

describe('Example', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Example />)
    }).not.toThrow()
  })
})
