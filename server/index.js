// Express
const express = require('express')
const app = express()
// graphql
const graphql = require('./graphql')
// DB
const db = require('./db')
const Category = require('./db/models/Category')

app.use(graphql)

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
