// Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Slugify
const {slugify} = require('transliteration')

const categorySchema = new Schema({
  name: {type: String, required: true},
  slug: {type: String}
})

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name)
  next()
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
