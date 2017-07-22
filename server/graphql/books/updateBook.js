const Book = require('../../db/models/Book')
// Types
const BookType = require('../types/BookType')
const BookInputType = require('../types/BookInputType')
// GraphQL
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql')

const updateBook = {
  updateBook: {
    type: BookType,
    description: 'Updates book in the db',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book you want to update'
      },
      book: {type: BookInputType, description: 'Input book'}
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {id, book} = args

        Book.findOneAndUpdate({_id: id}, book, {new: true}, (err, updatedBook) => {
          if (err) reject(err)
          else resolve(updatedBook)
        })
      })
    }
  }
}

module.exports = updateBook
