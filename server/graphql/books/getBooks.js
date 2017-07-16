const Book = require('../../db/models/Book')
// Types
const BookType = require('../types/BookType')
// GraphQL
const {GraphQLList} = require('graphql')

const getBooks = {
  getBooks: {
    type: new GraphQLList(BookType),
    description: 'Gets list of all books',
    resolve: () => {
      return new Promise((resolve, reject) => {
        Book.find((err, books) => {
          if (err) reject(err)
          else resolve(books)
        })
      })
    }
  }
}

module.exports = getBooks
