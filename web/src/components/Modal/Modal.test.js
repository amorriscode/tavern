import { render } from '@redwoodjs/testing'

import Modal from './Modal'

describe('Modal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Modal />)
    }).not.toThrow()
  })
})
