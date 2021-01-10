import { titles } from './titles'

describe('titles', () => {
  scenario('returns all titles', async (scenario) => {
    const result = await titles()

    expect(result.length).toEqual(Object.keys(scenario.title).length)
  })
})
