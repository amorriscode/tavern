import { context } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const guilds = () => {
  return db.guild.findMany()
}

export const guild = ({ id }) => {
  return db.guild.findOne({
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
  Transaction: (_obj, { root }) =>
    db.guild.findOne({ where: { id: root.id } }).Transaction(),
  users: (_obj, { root }) =>
    db.guild.findOne({ where: { id: root.id } }).users(),
}
