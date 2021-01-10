import { db } from 'src/lib/db'

export const testCases = () => {
  return db.testCase.findMany()
}

export const TestCase = {
  problem: (_obj, { root }) =>
    db.testCase.findOne({ where: { id: root.id } }).problem(),
}
