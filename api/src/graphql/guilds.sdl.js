export const schema = gql`
  type Guild {
    id: String!
    name: String!
    experience: Int!
    createdAt: DateTime!
    Transaction: [Transaction]!
    users: [User]!
  }

  type Query {
    guilds: [Guild!]!
    guild(id: String!): Guild
  }

  input CreateGuildInput {
    name: String!
    users: [String]
  }

  input UpdateGuildInput {
    name: String
  }

  type Mutation {
    createGuild(input: CreateGuildInput!): Guild!
    updateGuild(id: String!, input: UpdateGuildInput!): Guild!
    deleteGuild(id: String!): Guild!
  }
`