import { db } from 'src/lib/db'
import { context } from '@redwoodjs/api'

export const outfits = () => {
  return db.outfit.findMany()
}

export const setOutfit = async (input) => {
  const { currentUser } = context

  if (currentUser && !currentUser.outfit) {
    await db.outfit.deleteMany({ where: { id: currentUser.id } })
    await db.user.update({
      where: { email: currentUser.email },
      data: {
        outfit: {
          create: { ...input.outfit },
        },
      },
    })
  }
}

export const Outfit = {
  user: (_obj, { root }) =>
    db.outfit.findOne({ where: { id: root.id } }).user(),
}
