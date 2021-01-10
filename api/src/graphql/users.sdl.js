export const schema = gql`
  type User {
    id: String!
    name: String
    email: String!
    guild: Guild
    guildId: String
    level: Int!
    title: Title!
    titleId: String!
    outfit: Outfit
    experience: Int!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    topUsers: [User!]
  }

  input CreateUserInput {
    name: String
    email: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    experience: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
  }
`
