import express from 'express'
// GraphQL schema
import graphqlHTTP from 'express-graphql'
import Schema from './schema'

const app = express()

app.use('/graphql', graphqlHTTP(request => ({
  schema: Schema,
  context: request,
  pretty: true,
  graphiql: true,
})))

export default app
