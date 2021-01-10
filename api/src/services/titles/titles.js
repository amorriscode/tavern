import { db } from 'src/lib/db'

export const titles = () => {
  return db.title.findMany()
}

export const Title = {
  users: (_obj, { root }) =>
    db.title.findOne({ where: { id: root.id } }).users(),
}
