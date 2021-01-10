import { db } from 'src/lib/db'

export const difficulties = () => {
  return db.difficulty.findMany()
}

export const Difficulty = {
  Problem: (_obj, { root }) =>
    db.difficulty.findOne({ where: { id: root.id } }).Problem(),
}
