import { assignedProblems } from './assignedProblems'

describe('assignedProblems', () => {
  scenario('returns all assignedProblems', async (scenario) => {
    const result = await assignedProblems()

    expect(result.length).toEqual(Object.keys(scenario.assignedProblem).length)
  })
})
