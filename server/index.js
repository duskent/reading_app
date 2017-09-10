// Express
import express from 'express'
// graphql
import graphql from './graphql'
// DB
import db from './db'
// Initialization
const app = express()
// Middlewares
app.use(graphql)

app.listen(3000, () => console.log('Listening port 3000'))
