import { db } from 'src/lib/db'

export const scaffolds = () => {
  return db.scaffold.findMany()
}

export const Scaffold = {
  problem: (_obj, { root }) =>
    db.scaffold.findOne({ where: { id: root.id } }).problem(),
}
