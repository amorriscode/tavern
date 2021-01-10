export const schema = gql`
  type User {
    id: String!
    name: String!
    email: String!
    guild: Guild
    guildId: String
    level: Int!
    title: Title!
    titleId: String!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    topUsers: [User!]
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
  }
`
