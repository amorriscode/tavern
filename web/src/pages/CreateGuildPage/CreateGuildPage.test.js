import { render } from '@redwoodjs/testing'

import CreateGuildPage from './CreateGuildPage'

describe('CreateGuildPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateGuildPage />)
    }).not.toThrow()
  })
})
