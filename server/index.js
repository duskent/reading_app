// Express
import express from 'express'
import pathUtils from 'path'
// graphql
import graphql from './graphql'
// DB
import './db'
// Initialization
const app = express()
// Middlewares
app.use(graphql)
app.use('/', express.static('public'))
app.get( "*", function( req, res ) {
  res.sendFile(pathUtils.resolve('public', 'index.html' ))
})

app.listen(process.env.PORT, () => {
  console.log(`Listening port ${process.env.PORT}`) //eslint-disable-line
})
