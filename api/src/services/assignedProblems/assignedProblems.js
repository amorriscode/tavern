import { db } from 'src/lib/db'

export const assignedProblems = () => {
  return db.assignedProblem.findMany()
}

export const AssignedProblem = {
  problem: (_obj, { root }) =>
    db.assignedProblem.findOne({ where: { id: root.id } }).problem(),
  guild: (_obj, { root }) =>
    db.assignedProblem.findOne({ where: { id: root.id } }).guild(),
}
