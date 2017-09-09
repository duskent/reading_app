// Mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reading_app');

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db
