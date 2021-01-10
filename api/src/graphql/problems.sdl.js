export const schema = gql`
  type Problem {
    id: Int!
    name: String!
    description: String!
    difficulty: Difficulty!
    difficultyName: String!
    hints: [String]!
    sampleInput: String!
    sampleOutput: String!
    testCases: [TestCase]!
    scaffolds: [Scaffold]!
    checksum: String
    entrypoints: JSON
  }

  type SingleProblemRun {
    problem: Problem!
    testCase: TestCase!
    success: Boolean
    logs: [String]!
    error: Boolean
    stacktrace: String
  }

  type ProblemSubmitionResult {
    problem: Problem!
    solution: Solution!
    testCaseNumber: Int
    totalTestCaseNumber: Int
  }

  type Query {
    problems: [Problem!]!
    problem(id: Int!): Problem!
  }

  type Mutation {
    runProblem(id: Int!, body: String!, language: Language!): SingleProblemRun
    submitProblem(
      id: Int!
      body: String!
      language: Language!
    ): ProblemSubmitionResult
  }

  input CreateProblemInput {
    name: String!
    description: String!
    difficultyName: String!
    hints: [String]!
    sampleInput: String!
    sampleOutput: String!
    checksum: String
    entrypoints: JSON
  }

  input UpdateProblemInput {
    name: String
    description: String
    difficultyName: String
    hints: [String]!
    sampleInput: String
    sampleOutput: String
    checksum: String
    entrypoints: JSON
  }
`
