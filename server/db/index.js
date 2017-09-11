import dotenv from 'dotenv'
dotenv.load()
// Mongoose connection
import mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

export default db
