import { render, screen } from '@redwoodjs/testing'
import { Loading, Empty, Failure, Success } from './CharacterLeaderboardCell'
import { standard } from './CharacterLeaderboardCell.mock'

describe('CharacterLeaderboardCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  //   expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success characterLeaderboard={standard().characterLeaderboard} />)
    }).not.toThrow()
  })
})
