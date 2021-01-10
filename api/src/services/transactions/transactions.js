import { context } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { updateUser } from 'src/services/users'
import { guild, updateGuild } from 'src/services/guilds'

export const transactions = () => {
  return db.transaction.findMany()
}

export const transaction = ({ id }) => {
  return db.transaction.findOne({
    where: { id },
  })
}

export const createTransaction = async ({ input }) => {
  requireAuth()

  const { delta } = input
  const { currentUser } = context
  const userGuild = await guild({ id: currentUser.guildId })

  const userExperience = currentUser.experience + delta
  const guildExperience = userGuild.experience + delta

  await updateUser({
    id: currentUser.id,
    input: { experience: userExperience },
  })

  await updateGuild({
    id: userGuild.id,
    input: { experience: guildExperience },
  })

  return db.transaction.create({
    data: {
      delta,
      userExperience,
      guildExperience,
      user: {
        connect: { id: currentUser.id },
      },
      guild: {
        connect: { id: userGuild.id },
      },
    },
  })
}

export const updateTransaction = ({ id, input }) => {
  return db.transaction.update({
    data: input,
    where: { id },
  })
}

export const deleteTransaction = ({ id }) => {
  return db.transaction.delete({
    where: { id },
  })
}

export const Transaction = {
  guild: (_obj, { root }) =>
    db.transaction.findOne({ where: { id: root.id } }).guild(),
}
