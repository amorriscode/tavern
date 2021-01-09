/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()
var updated = false;

async function create_or_update_difficulty(name, color, description) {
  const difficulty = await db.difficulty.findUnique({ where: { name } })
  if (!difficulty) {
    console.info(`Creating new difficulty: { ${name}, ${color}, ${description} }.`)
    await db.difficulty.create({ data: { name, color, description } })
    updated = true
  } else {

    if (difficulty.color !== color) {
      console.info(`Updating ${name} color (${difficulty.color} -> ${color})..`)
      updated = true
    }

    if (difficulty.description !== description) {
      console.info(`Updating ${name} description..`)
      updated = true
    }

    await db.difficulty.update({
      where: { name },
      data: { color, description }
    })
  }
}

async function main() {
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  //
  //   const existing = await db.user.findMany({ where: { email: 'admin@email.com' }})
  //   if (!existing.length) {
  //     await db.user.create({ data: { name: 'Admin', email: 'admin@email.com' }})
  //   }

  // todo: use constants.js?
  await create_or_update_difficulty('Easy', '#52fd74', 'An easy challenge.')
  await create_or_update_difficulty('Medium', '#fdd852', 'A medium challenge.')
  await create_or_update_difficulty('Hard', '#fd5251', 'A hard challenge.')

  if (!updated) {
    console.info('No data to seed.')
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
