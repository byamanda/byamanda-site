import { ApolloServer } from "apollo-server-express"
import express from "express"
import { merge } from "lodash"
import passport from "passport"
import bodyParser from "body-parser"
import cors from "cors"

import typeDefs from "./types"
import queries from "./queries"
import mutations from "./mutations"
import scalars from "./scalars"
import schemaDirectives from "./directives"
import dataSources from "./datasource"

import authRoutes from "./routes/auth"
import initPassport from "./authentication"

const path = "/graphql"
const app = express()

// Setup and initialize middleware and passport
initPassport()
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use("/auth", authRoutes)

app.use(path, (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
    }

    next()
  })(req, res, next)
})

// Configure Apollo Server
let resolvers = merge({}, queries, mutations, scalars)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  dataSources,
  context: ({ req }) => ({
    user: req.user,
  }),
})
server.applyMiddleware({ app, path })

export default app