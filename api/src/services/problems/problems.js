import { db } from 'src/lib/db'
const { VM } = require('vm2')

const languageMap = {
  JAVASCRIPT: 'js',
}

export const problems = () => {
  return db.problem.findMany()
}

export const problem = ({ id }) => {
  return db.problem.findUnique({ where: { id } })
}

const solveJavascript = ({ entrypoint, testCase, timeout, body }) => {
  const logs = []
  const vm = new VM({
    timeout,
    console: 'redirect',
    sandbox: {
      console: {
        log: function (msg) {
          logs.push(msg)
        },
      },
    },
  })

  const input = JSON.parse(testCase.input)
  const output = JSON.parse(testCase.output)

  let toExecute = entrypoint
  Object.keys(input).forEach((key) => {
    const value = input[key]
    toExecute = toExecute.replace(
      `$${parseInt(key) + 1}`,
      `${JSON.stringify(value)}`
    )
  })

  let result = null
  let stacktrace = null
  try {
    result = vm.run(`${body}${toExecute}`)
  } catch (e) {
    stacktrace = e.stack
  }

  let success = false
  if (result) {
    for (let answer of output) {
      if (JSON.stringify(answer) === JSON.stringify(result)) {
        success = true
        break
      }
    }
  }

  return {
    success,
    logs,
    stacktrace,
    output: `${result}`,
  }
}

export const submitProblem = async ({ id, body, language }) => {
  const problem = await db.problem.findUnique({ where: { id } })
  const entrypoint = problem.entrypoints[languageMap[language]]
  const testCases = await db.testCase.findMany({ where: { problemId: id } })

  if (language == 'JAVASCRIPT') {
    let index = 0
    const start = new Date().getTime()

    for (const testCase of testCases) {
      const result = solveJavascript({
        entrypoint,
        testCase,
        timeout: 1000,
        body,
      })

      if (!result.success) {
        let solution = await db.solution.create({
          data: {
            body,
            success: result.success,
            testCase: {
              connect: { id: testCase.id },
            },
            output: result.output,
            executionTime: new Date().getTime() - start,
            stacktrace: result.stacktrace,
            errorLogs: result.logs,
          },
        })

        return {
          problem,
          solution,
          testCaseNumber: index + 1,
          totalTestCaseNumber: testCases.length,
        }
      }

      index++
    }

    let solution = await db.solution.create({
      data: {
        body,
        success: true,
        executionTime: new Date().getTime() - start,
      },
    })

    return {
      problem,
      solution,
      totalTestCaseNumber: testCases.length,
    }
  }
}

export const runProblem = ({ id, body, language }) => {
  return db.problem.findUnique({ where: { id } }).then((problem) => {
    return db.testCase
      .findFirst({ where: { problemId: id } })
      .then((testCase) => {
        const entrypoint = problem.entrypoints[languageMap[language]]

        if (language == 'JAVASCRIPT') {
          const result = solveJavascript({
            entrypoint,
            testCase,
            timeout: 1000,
            body,
          })

          return {
            problem,
            testCase,
            success: result.success,
            logs: result.logs,
            error: result.stacktrace != null,
            stacktrace: result.stacktrace,
            output: result.output,
          }
        }
      })
  })
}

export const Problem = {
  difficulty: (_obj, { root }) =>
    db.problem.findUnique({ where: { id: root.id } }).difficulty(),
  testCases: (_obj, { root }) =>
    db.problem.findUnique({ where: { id: root.id } }).testCases(),
  scaffolds: (_obj, { root }) =>
    db.problem.findUnique({ where: { id: root.id } }).scaffolds(),
}
