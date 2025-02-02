export const schema = gql`
  type AssignedProblem {
    id: String!
    problem: Problem!
    problemId: Int!
    guild: Guild
    guildId: String
    createdAt: DateTime!
    required: Int
    remaining: Int
    solved: Boolean
  }

  type Query {
    assignedProblems: [AssignedProblem!]!
  }

  input CreateAssignedProblemInput {
    problemId: Int!
    guildId: String
  }

  input UpdateAssignedProblemInput {
    problemId: Int
    guildId: String
  }
`
