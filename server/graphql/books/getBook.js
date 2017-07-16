const Book = require('../../db/models/Book')
// Types
const BookType = require('../types/BookType')
// GraphQL
const {
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const getBook = {
  getBook: {
    type: BookType,
    description: 'Gets list of all books',
    args: {
      id: {type: new GraphQLNonNull(GraphQLString), description: 'Id of fetched book'}
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {id} = args

        Book.findOne({_id: id}, (err, book) => {
          if (err) reject(err)
          else resolve(book)
        })
      })
    }
  }
}

module.exports = getBook
