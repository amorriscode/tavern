export const schema = gql`
  type Title {
    id: String!
    name: String!
    users: [User]!
    unlockLevel: Int!
  }
`
