export const schema = gql`
  type Transaction {
    id: String!
    guild: Guild
    guildId: String
    delta: Int!
    result: Int!
    time: DateTime!
  }

  type Query {
    transactions: [Transaction!]!
    transaction(id: String!): Transaction
  }

  input CreateTransactionInput {
    guildId: String
    delta: Int!
    result: Int!
    time: DateTime!
  }

  input UpdateTransactionInput {
    guildId: String
    delta: Int
    result: Int
    time: DateTime
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(id: String!, input: UpdateTransactionInput!): Transaction!
    deleteTransaction(id: String!): Transaction!
  }
`
