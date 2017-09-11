// Mongoose connection
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/reading_app')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

export default db
