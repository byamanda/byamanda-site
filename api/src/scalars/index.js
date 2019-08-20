import { GraphQLScalarType, Kind } from "graphql"

export default {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      // from client
      return new Date(value)
    },
    serialize(value) {
      // from server
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value)
      }

      return null
    },
  }),
}
