// Schema
import mongoose from 'mongoose'
const Schema = mongoose.Schema
// Slugify
import {slugify} from 'transliteration'

const bookSchema = new Schema({
  title: {type: String, required: true},
  author: String,
  description: String,
  cover: String,
  finished: {type: Boolean, default: false},
  slug: {type: String},
  categories: [{name: {type: String, required: true}}]
})

// Do not change to es6 arrow function
bookSchema.pre('save', function (next) {
  if (this.author) {
    this.slug = `${slugify(this.author)}-${slugify(this.title)}`
  } else {
    this.slug = slugify(this.title)
  }

  next()
})

bookSchema.pre('findOneAndUpdate', function (next) {
  const _id = this._conditions._id
  const slug = `${slugify(this._update.author)}-${slugify(this._update.title)}`

  this.findOneAndUpdate({_id}, {slug})
  next()
})


export default mongoose.model('Book', bookSchema)
