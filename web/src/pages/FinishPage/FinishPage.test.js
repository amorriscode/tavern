import { render } from '@redwoodjs/testing'

import FinishPage from './FinishPage'

describe('FinishPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FinishPage />)
    }).not.toThrow()
  })
})
