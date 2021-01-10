import { db } from 'src/lib/db'

export const solutions = () => {
  return db.solution.findMany()
}

export const Solution = {
  testCase: (_obj, { root }) =>
    db.solution.findOne({ where: { id: root.id } }).testCase(),
}
