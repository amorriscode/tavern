import { solutions } from './solutions'

describe('solutions', () => {
  scenario('returns all solutions', async (scenario) => {
    const result = await solutions()

    expect(result.length).toEqual(Object.keys(scenario.solution).length)
  })
})
