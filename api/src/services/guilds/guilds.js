import { context } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const guilds = () => {
  return db.guild.findMany()
}

export const topGuilds = () => {
  return db.guild.findMany({
    orderBy: [
      {
        experience: 'desc',
      },
    ],
    take: 50,
  })
}

export const guild = ({ id }) => {
  return db.guild.findUnique({
    where: { id },
  })
}

export const createGuild = ({ input }) => {
  requireAuth()

  const { name, users } = input

  return db.guild.create({
    data: {
      name,
      users: {
        connect: [
          { id: context.currentUser.id },
          ...users.map((email) => ({ email })),
        ],
      },
    },
  })
}

export const updateGuild = ({ id, input }) => {
  return db.guild.update({
    data: input,
    where: { id },
  })
}

export const deleteGuild = ({ id }) => {
  return db.guild.delete({
    where: { id },
  })
}

export const Guild = {
  transactions: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).transactions(),
  users: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).users(),
  assignedProblems: (_obj, { root }) =>
    db.guild.findUnique({ where: { id: root.id } }).assignedProblems(),
}
