import Book from '../../db/models/Book'
// Types
import BookType from '../types/BookType'
// GraphQL
import {GraphQLString, GraphQLNonNull} from 'graphql'

const getBook = {
  getBook: {
    type: BookType,
    description: 'Gets list of all books',
    args: {
      id: {type: new GraphQLNonNull(GraphQLString), description: 'Id of fetched book'}
    },
    resolve: async (source, args) => {
      try {
        return await Book.findOne({_id: args.id})
      } catch (e) {
        throw new Error(`Could not find Book with id ${args.id}`)
      }
    }
  }
}

export default getBook
