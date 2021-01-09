import { render } from '@redwoodjs/testing'

import Console from './Console'

describe('Console', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Console />)
    }).not.toThrow()
  })
})
