// Schema
import mongoose from 'mongoose'
const Schema = mongoose.Schema
// Slugify
import {slugify} from 'transliteration'

const categorySchema = new Schema({
  name: {type: String, required: true},
  slug: {type: String}
})

// Do not change to es6 arrow function
categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name)
  next()
})

export default mongoose.model('Category', categorySchema)
