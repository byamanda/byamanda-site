import { gql } from "graphql"

let Root = gql`
  type Query {
    dummy: String
  }

  type Mutation {
    dummy: String
  }

  type GeneralResponse {
    id: ID 
    type: String
    message: String 
  }

  type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

export default [Root]