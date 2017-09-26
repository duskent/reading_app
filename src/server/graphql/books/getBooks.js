import Book from '../../db/models/Book'
// Types
import BookType from '../types/BookType'
// GraphQL
import {GraphQLList} from 'graphql'

const getBooks = {
  getBooks: {
    type: new GraphQLList(BookType),
    description: 'Gets list of all books',
    resolve: async () => {
      return await Book.find()
    }
  }
}

export default getBooks
