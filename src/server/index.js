// Express
import express from 'express'
import pathUtils from 'path'
import cors from 'cors'
// graphql
import graphql from './graphql'
// DB
import './db'
// Initialization
const app = express()
// Middlewares
// CORS
app.use(cors())
app.use(graphql)
app.use('/', express.static('build'))
app.get( "*", function( req, res ) {
  res.sendFile(pathUtils.resolve('build', 'index.html' ))
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening port ${process.env.SERVER_PORT}`) //eslint-disable-line
})
