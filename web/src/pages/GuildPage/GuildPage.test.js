import { render } from '@redwoodjs/testing'

import GuildPage from './GuildPage'

describe('GuildPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GuildPage />)
    }).not.toThrow()
  })
})
