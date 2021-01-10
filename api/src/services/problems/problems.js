import { db } from 'src/lib/db'

export const problems = () => {
  return db.problem.findMany()
}

export const problem = ({ id }) => {
  return db.problem.findUnique({ where: { id } })
}

export const Problem = {
  difficulty: (_obj, { root }) =>
    db.problem.findUnique({ where: { id: root.id } }).difficulty(),
  testCases: (_obj, { root }) =>
    db.problem.findUnique({ where: { id: root.id } }).testCases(),
  scaffolds: (_obj, { root }) =>
    db.problem.findUnique({ where: { id: root.id } }).scaffolds(),
}
