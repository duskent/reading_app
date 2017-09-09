// Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Slugify
const {slugify} = require('transliteration')

const bookSchema = new Schema({
  title: {type: String, required: true},
  author: String,
  finished: {type: Boolean, default: false},
  slug: {type: String},
  categories: [{name: {type: String, required: true}}]
})

bookSchema.pre('save', function (next) {
  if (this.author) {
    this.slug = `${slugify(this.author)}-${slugify(this.title)}`
  } else {
    this.slug = slugify(this.title)
  }

  next()
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
