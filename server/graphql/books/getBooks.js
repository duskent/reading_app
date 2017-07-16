const BookType = require('../types/BookType')
const {GraphQLList} = require('graphql')
const Book = require('../../db/models/Book')

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
