const BookType = require('../types/BookType')
const Book = require('../../db/models/Book')
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql')
const CategoryType = require('../types/CategoryType')

const createBook = {
  createBook: {
    type: BookType,
    args: {
      title: {type: new GraphQLNonNull(GraphQLString), description: 'Title of a new book'},
      author: {type: GraphQLString, description: 'Book\'s author'},
      finished: {type: GraphQLBoolean, description: 'Represents reading status of book'},
      categories: {
        type: new GraphQLList(new GraphQLInputObjectType({
          name: 'BookCategories',
          description: 'Input category realated to this book',
          fields: () => ({
            name: {type: new GraphQLNonNull(GraphQLString), description: 'Name of category'}
          })
        })),
        description: 'Categories in which current book belongs'
      }
    },
    description: 'Creates new book in the database',
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {title, author, finished, categories} = args

        const newBook = {title, author, finished, categories}

        Book.create(newBook, (err, book) => {
          if (err) reject(err)
          else resolve(book)
        })
      })
    }
  }
}

module.exports = createBook
