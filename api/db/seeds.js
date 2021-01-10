/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const { promises: fs } = require('fs')
const dotenv = require('dotenv')
const problemRoot = '../src/problems'
const extensionMap = { js: 'JAVASCRIPT' }
const hash = require('object-hash')

dotenv.config()
const db = new PrismaClient()
var updated = false

async function createOrUpdateDifficulty(name, color, description) {
  const difficulty = await db.difficulty.findUnique({ where: { name } })
  if (!difficulty) {
    console.info(
      `Creating new difficulty: { ${name}, ${color}, ${description} }.`
    )
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
      data: { color, description },
    })
  }
}

async function seedProblems() {
  const problems = await fs.readdir(problemRoot)
  for (problem of problems) {
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
      for (scaffoldName of scaffoldFiles) {
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
      for (rawTestCase of rawTestCases) {
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
  await createOrUpdateDifficulty('Easy', '#52fd74', 'An easy challenge.')
  await createOrUpdateDifficulty('Medium', '#fdd852', 'A medium challenge.')
  await createOrUpdateDifficulty('Hard', '#fd5251', 'A hard challenge.')

  await seedProblems()

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
