// Mongoose connection
<<<<<<< HEAD
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reading_app');
=======
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/reading_app')
>>>>>>> webpack

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

export default db
