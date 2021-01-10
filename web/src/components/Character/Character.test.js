import { render } from '@redwoodjs/testing'

import Character from './Character'

describe('Character', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Character />)
    }).not.toThrow()
  })
})
