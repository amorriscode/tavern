import { testCases } from './testCases'

describe('testCases', () => {
  scenario('returns all testCases', async (scenario) => {
    const result = await testCases()

    expect(result.length).toEqual(Object.keys(scenario.testCase).length)
  })
})
