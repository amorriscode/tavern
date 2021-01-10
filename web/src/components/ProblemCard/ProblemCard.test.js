import { render } from '@redwoodjs/testing'

import ProblemCard from './ProblemCard'

describe('ProblemCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProblemCard />)
    }).not.toThrow()
  })
})
