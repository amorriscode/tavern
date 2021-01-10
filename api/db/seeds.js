/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const { promises: fs } = require('fs')
const dotenv = require('dotenv')
const problemRoot = '../src/problems'
const extensionMap = { js: 'JAVASCRIPT' }
const hash = require('object-hash')
const faker = require('faker')

dotenv.config()
const db = new PrismaClient()
let updated = false

async function createOrUpdateDifficulty(name, color, description, experience) {
  const difficulty = await db.difficulty.findUnique({ where: { name } })
  if (!difficulty) {
    console.info(
      `Creating new difficulty: { ${name}, ${color}, ${description}, ${experience} }.`
    )
    await db.difficulty.create({
      data: { name, color, description, experience },
    })
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
      data: { color, description, experience },
    })
  }
}

async function seedProblems() {
  const problems = await fs.readdir(problemRoot)
  for (var problem of problems) {
    const stat = await fs.lstat(`${problemRoot}/${problem}`)
    if (stat.isDirectory()) {
      console.info(`Attempting to seed problem from directory '${problem}'..`)

      let metadata
      try {
        metadata = require(`${problemRoot}/${problem}/metadata.json`)
      } catch {
        console.error(`Failed to fetch metadata.json for ${problem}!`)
        continue
      }

      let rawTestCases
      try {
        rawTestCases = require(`${problemRoot}/${problem}/testCases.json`)
      } catch {
        console.error(`Failed to fetch testCases.json for ${problem}!`)
        continue
      }

      const scaffolds = []
      const scaffoldFiles = await fs.readdir(
        `${problemRoot}/${problem}/scaffolds`
      )
      for (var scaffoldName of scaffoldFiles) {
        const extension = scaffoldName.split('.').pop()
        const body = await fs.readFile(
          `${problemRoot}/${problem}/scaffolds/${scaffoldName}`,
          'utf8'
        )
        const id = `${problem}-${extensionMap[extension].toLowerCase()}`

        scaffolds.push({
          where: { id },
          create: {
            id,
            body,
            language: extensionMap[extension],
          },
        })
      }

      const testCases = []
      for (var rawTestCase of rawTestCases) {
        testCases.push({
          input: JSON.stringify(rawTestCase.input),
          output: JSON.stringify(rawTestCase.output),
        })
      }

      const model = {
        id: metadata.id,
        name: metadata.name,
        description: metadata.description,
        difficulty: { connect: { name: metadata.difficulty } },
        hints: metadata.hints,
        sampleInput: metadata.sample.input,
        sampleOutput: metadata.sample.output,
        testCases: { create: testCases },
        scaffolds: { connectOrCreate: scaffolds },
        entrypoints: metadata.entrypoints,
      }

      model['checksum'] = hash(model)

      const existing = await db.problem.findUnique({
        where: { id: metadata.id },
      })
      if (existing) {
        if (model.checksum !== existing.checksum) {
          console.info(
            `Outdated checksum for problem ${model.id} (${problem})! Updating DB.`
          )

          await db.testCase.deleteMany({ where: { problemId: metadata.id } })
          await db.problem.update({
            where: { id: metadata.id },
            data: model,
          })
          updated = true
        }
      } else {
        console.info(
          `Created new problem in database ${model.id} (${problem})!`
        )
        await db.problem.create({ data: foreignKeyReplacement(model) })
        updated = true
      }
    }
  }
}

async function seedUsers() {
  await db.outfit.deleteMany({ where: {} })
  await db.guild.deleteMany({ where: {} })
  await db.user.deleteMany({ where: {} })

  let title = await db.title.findFirst({ where: { name: 'Peasant' } })
  let lastGuildId = null

  for (let i = 0; i < 50; i++) {
    let name = faker.name.firstName()
    let email = faker.internet.email()
    let level = Math.floor(Math.random() * 101)
    let experience = Math.floor(Math.random() * 10001)
    let outfit = randomOutfit()

    let guild = undefined
    if (Math.random() > 0.3) {
      if (Math.random() > 0.3 && lastGuildId != null) {
        guild = { connect: { id: lastGuildId } }
      } else {
        const tG = await db.guild.create({
          data: {
            name: faker.random.word(),
            experience: Math.floor(Math.random() * 100001),
          },
        })

        lastGuildId = tG.id
        guild = { connect: { id: lastGuildId } }
      }
    }

    let user = await db.user.create({
      data: {
        name,
        email,
        level,
        title: { connect: { id: title.id } },
        experience,
        outfit: {
          create: { ...outfit },
        },
        guild,
      },
    })

    console.info(`created ${JSON.stringify(user)}`)
    updated = true
  }
}

function r(max) {
  return Math.floor(Math.random() * max)
}

function randomOutfit() {
  return {
    skin: r(4),
    head: r(2),
    neck: 0,
    body: r(4),
    ears: r(2),
    eyes: r(3),
    nose: r(3),
    mouth: r(3),
    hair: r(4),
    facial: r(8),
    hairColour: r(7),
  }
}

async function seedTitles() {
  const titles = [{ name: 'Peasant', unlockLevel: 1 }]

  for (const title of titles) {
    await db.title.create({ data: title })
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

  await createOrUpdateDifficulty('Easy', '#52fd74', 'An easy challenge.', 5)
  await createOrUpdateDifficulty('Medium', '#fdd852', 'A medium challenge.', 10)
  await createOrUpdateDifficulty('Hard', '#fd5251', 'A hard challenge.', 15)

  await seedProblems()

  await seedTitles()

  await seedUsers()

  if (!updated) {
    console.info('No data to seed.')
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })

const foreignKeyReplacement = (input) => {
  let output = input
  const foreignKeys = Object.keys(input).filter((k) => k.match(/Id$/))
  foreignKeys.forEach((key) => {
    const modelName = key.replace(/Id$/, '')
    const value = input[key]
    delete output[key]
    output = Object.assign(output, {
      [modelName]: { connect: { id: value } },
    })
  })
  return output
}
