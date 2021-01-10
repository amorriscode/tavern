import { render } from '@redwoodjs/testing'

import ProblemPage from './ProblemPage'

describe('ProblemPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProblemPage />)
    }).not.toThrow()
  })
})
