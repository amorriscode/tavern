export const schema = gql`
  type Scaffold {
    id: String!
    problem: Problem!
    problemId: Int!
    body: String!
    language: Language!
  }

  enum Language {
    JAVASCRIPT
  }

  type Query {
    scaffolds: [Scaffold!]!
  }

  input CreateScaffoldInput {
    problemId: Int!
    body: String!
    language: Language!
  }

  input UpdateScaffoldInput {
    problemId: Int
    body: String
    language: Language
  }
`
