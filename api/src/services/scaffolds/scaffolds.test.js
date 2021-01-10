import { scaffolds } from './scaffolds'

describe('scaffolds', () => {
  scenario('returns all scaffolds', async (scenario) => {
    const result = await scaffolds()

    expect(result.length).toEqual(Object.keys(scenario.scaffold).length)
  })
})
