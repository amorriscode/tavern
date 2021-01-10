export const schema = gql`
  type Outfit {
    id: String!
    user: User!
    head: Int!
    ears: Int!
    eyes: Int!
    facial: Int
    hair: Int
    body: Int!
    hat: Int
    mouth: Int!
    neck: Int!
    nose: Int!
    skin: Int!
    hairColour: Int!
  }

  type Query {
    outfits: [Outfit!]!
  }

  type Mutation {
    setOutfit(outfit: CreateOutfitInput!): Boolean
  }

  input CreateOutfitInput {
    head: Int!
    ears: Int!
    eyes: Int!
    body: Int!
    facial: Int
    hair: Int
    hat: Int
    mouth: Int!
    neck: Int!
    nose: Int!
    skin: Int!
    hairColour: Int!
  }

  input UpdateOutfitInput {
    head: Int
    ears: Int
    eyes: Int
    facial: Int
    hair: Int
    hat: Int
    mouth: Int
    neck: Int
    body: Int
    nose: Int
    skin: Int
    hairColour: Int
  }
`
