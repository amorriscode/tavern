import { render } from '@redwoodjs/testing'

import Portal from './Portal'

describe('Portal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Portal />)
    }).not.toThrow()
  })
})
