const express = require('express')
const graphqlHTTP = require('express-graphql')

const Schema = require('./schema')
const app = express()

app.use('/graphql', graphqlHTTP(request => ({
  schema: Schema,
  context: request,
  pretty: true,
  graphiql: true,
})))

module.exports = app
