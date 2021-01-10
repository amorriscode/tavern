import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const topUsers = () => {
  return db.user.findMany({
    orderBy: [
      {
        level: 'desc',
      },
    ],
    take: 50,
  })
}

export const user = ({ id }) => {
  console.log(id)
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = async ({ input }) => {
  const { name, email } = input

  const titles = await db.title.findMany({ where: { unlockLevel: 1 } })
  const title = titles.find((title) => title.unlockLevel === 1)

  return db.user.create({
    data: {
      name,
      email,
      level: 1,
      title: {
        connect: {
          id: title.id,
        },
      },
    },
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const User = {
  guild: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).guild(),
  title: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).title(),
}
