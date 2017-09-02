const Book = require('../../db/models/Book')
// Types
const BookType = require('../types/BookType')
const CategoryInputType = require('../types/CategoryInputType')
// GraphQL
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql')

const addCategoryToBook = {
  addCategoryToBook: {
    type: BookType,
    description: 'Adds new category to book by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      },
      category: {type: CategoryInputType, description: 'Inserted category'}
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {id, category} = args

        Book.findOneAndUpdate({_id: id}, {$push: {categories: category}}, {new: true}, (err, updatedBook) => {
          if (err) reject(err)
          else resolve(updatedBook)
        })
      })
    }
  }
}

module.exports = addCategoryToBook
