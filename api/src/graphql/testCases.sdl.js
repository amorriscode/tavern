export const schema = gql`
  type TestCase {
    id: Int!
    problem: Problem!
    problemId: Int!
    input: String!
    output: String!
  }

  type Query {
    testCases: [TestCase!]!
  }

  input CreateTestCaseInput {
    problemId: Int!
    input: String!
    output: String!
  }

  input UpdateTestCaseInput {
    problemId: Int
    input: String
    output: String
  }
`
