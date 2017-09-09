const Book = require('../../db/models/Book')
const Category = require('../../db/models/Category')
// Types
const CategoryType = require('../types/CategoryType')
const BookType = require('../types/BookType')
// GraphQL
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

const addBookToCategory = {
  addBookToCategory: {
    type: CategoryType,
    description: 'Adds new book to category by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the category'
      },
      bookId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      }
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {id, bookId} = args

        Category.findOne({_id: id}, (err, category) => {
          if (err) reject(err)

          const newCategory = {name: category.name}

          Book.findOneAndUpdate({_id: bookId}, {$push: {categories: newCategory}}, {new: true}, (err, updatedBook) => {
            if (err) reject(err)
            else resolve(category)
          })
        })
      })
    }
  }
}

module.exports = addBookToCategory
