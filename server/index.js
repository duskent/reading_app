// Express
const express = require('express')
const app = express()
// graphql
const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema')
const root = require('./graphql/root')
// Middlewares
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
// DB
const db = require('./db')
const Category = require('./db/models/Category')

app.get('/', function (req, res) {
  Category.find({}, function (err, data) {
    if (err) throw err
    res.json({
      categories: data
    })
  })
})

app.listen(3000, function () {
  console.log('Listening port 3000');
})
