export const schema = gql`
  type Difficulty {
    name: String!
    color: String!
    description: String!
    Problem: [Problem]!
  }

  type Query {
    difficulties: [Difficulty!]!
  }

  input CreateDifficultyInput {
    name: String!
    color: String!
    description: String!
  }

  input UpdateDifficultyInput {
    name: String
    color: String
    description: String
  }
`
