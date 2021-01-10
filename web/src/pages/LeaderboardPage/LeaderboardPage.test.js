import { render } from '@redwoodjs/testing'

import LeaderboardPage from './LeaderboardPage'

describe('LeaderboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LeaderboardPage />)
    }).not.toThrow()
  })
})
