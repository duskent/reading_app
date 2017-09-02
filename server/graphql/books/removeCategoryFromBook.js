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

const removeCategoryFromBook = {
  removeCategoryFromBook: {
    type: BookType,
    description: 'Removes category from book ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      },
      category: {type: CategoryInputType, description: 'Removed category'}
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {id, category} = args

        Book.findOneAndUpdate({_id: id}, {$pull: {categories: category}}, {new: true}, (err, updatedBook) => {
          if (err) reject(err)
          else resolve(updatedBook)
        })
      })
    }
  }
}

module.exports = removeCategoryFromBook
