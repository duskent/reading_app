// Express
import express from 'express'
// graphql
import graphql from './graphql'
// DB
import './db'
// Initialization
const app = express()
// Middlewares
app.use(graphql)

app.listen(process.env.PORT, () => {
  console.log(`Listening port ${process.env.PORT}`) //eslint-disable-line
})
