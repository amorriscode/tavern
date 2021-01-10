import { difficulties } from './difficulties'

describe('difficulties', () => {
  scenario('returns all difficulties', async (scenario) => {
    const result = await difficulties()

    expect(result.length).toEqual(Object.keys(scenario.difficulty).length)
  })
})
