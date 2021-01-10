export const schema = gql`
  type Solution {
    id: String!
    body: String!
    success: Boolean!
    testCase: TestCase
    testCaseId: Int
    output: String
    executionTime: Int!
    stacktrace: String
    errorLogs: [String]
  }

  type Query {
    solutions: [Solution!]!
  }

  input CreateSolutionInput {
    body: String!
    success: Boolean!
    testCaseId: Int
    output: String
    executionTime: Int!
    stacktrace: String
    errorLogs: [String]
  }

  input UpdateSolutionInput {
    body: String
    success: Boolean
    testCaseId: Int
    output: String
    executionTime: Int
    stacktrace: String
    errorLogs: [String]
  }
`
