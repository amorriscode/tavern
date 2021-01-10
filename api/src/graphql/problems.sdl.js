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
  }

  type Query {
    problems: [Problem!]!
    problem(id: Int!): Problem!
  }

  input CreateProblemInput {
    name: String!
    description: String!
    difficultyName: String!
    hints: [String]!
    sampleInput: String!
    sampleOutput: String!
    checksum: String
  }

  input UpdateProblemInput {
    name: String
    description: String
    difficultyName: String
    hints: [String]!
    sampleInput: String
    sampleOutput: String
    checksum: String
  }
`
