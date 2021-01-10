import { problems } from './problems'

describe('problems', () => {
  scenario('returns all problems', async (scenario) => {
    const result = await problems()

    expect(result.length).toEqual(Object.keys(scenario.problem).length)
  })
})
