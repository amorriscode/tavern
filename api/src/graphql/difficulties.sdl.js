export const schema = gql`
  type Difficulty {
    name: String!
    color: String!
    description: String!
    Problem: [Problem]!
    experience: Int!
  }

  type Query {
    difficulties: [Difficulty!]!
  }

  input CreateDifficultyInput {
    name: String!
    color: String!
    description: String!
    experience: Int!
  }

  input UpdateDifficultyInput {
    name: String
    color: String
    description: String
    experience: Int
  }
`
