import { outfits } from './outfits'

describe('outfits', () => {
  scenario('returns all outfits', async (scenario) => {
    const result = await outfits()

    expect(result.length).toEqual(Object.keys(scenario.outfit).length)
  })
})
