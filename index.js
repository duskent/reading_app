// Mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reading_app');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const Schema = mongoose.Schema;
// Express
const express = require('express')
const app = express()

const categorySchema = new Schema({
  name: String
})

const Category = mongoose.model('Category', categorySchema);

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
