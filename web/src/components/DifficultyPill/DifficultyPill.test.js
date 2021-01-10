import { render } from '@redwoodjs/testing'

import DifficultyPill from './DifficultyPill'

describe('DifficultyPill', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DifficultyPill />)
    }).not.toThrow()
  })
})
