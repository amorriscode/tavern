import { context } from '@redwoodjs/api'

import { db } from 'src/lib/db'

const PERCENTAGE_REQUIRED = 0.5

export const assignedProblems = () => {
  return db.assignedProblem.findMany()
}

export const assignProblem = () => {
  // When assigning we should calculate the requirement
  return
}

export const solveAssignedProblem = async ({ problem }) => {
  const { currentUser } = context

  const problemTransactions = await db.transaction.findMany({
    where: { guildId: currentUser.guild.id, problemId: problem.id },
  })

  // Manually count shit becuase prisma doesn't have groupBy yet
  const problemTransactionSet = new Set()
  for (const problemTransaction of problemTransactions) {
    problemTransactionSet.add(problemTransaction.userId)
  }
  const problemTransactionCount = problemTransactionSet.size

  const guildUsers = await db.user.count({
    where: { guildId: currentUser.guild.id },
  })

  const required = Math.ceil(guildUsers * PERCENTAGE_REQUIRED)

  const assignedProblem = await db.assignedProblem.findFirst({
    where: { problemId: problem.id },
  })

  const solved = problemTransactionCount >= required

  if (solved) {
    // @TODO Assign a new problem for the guild if solved
    // see assignProblem above
  }

  return db.assignedProblem.update({
    where: { id: assignedProblem.id },
    data: {
      required,
      solved,
      remaining: Math.ceil(required - problemTransactionCount),
    },
  })
}

export const AssignedProblem = {
  problem: (_obj, { root }) =>
    db.assignedProblem.findOne({ where: { id: root.id } }).problem(),
  guild: (_obj, { root }) =>
    db.assignedProblem.findOne({ where: { id: root.id } }).guild(),
}
