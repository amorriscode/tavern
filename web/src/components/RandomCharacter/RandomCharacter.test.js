import { render } from '@redwoodjs/testing'

import RandomCharacter from './RandomCharacter'

describe('RandomCharacter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RandomCharacter />)
    }).not.toThrow()
  })
})
