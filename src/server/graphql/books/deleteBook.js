import Book from '../../db/models/Book'
// Types
import Message from '../types/Message'
// GraphQL
import {GraphQLString, GraphQLNonNull} from 'graphql'

const deleteBook = {
  deleteBook: {
    type: Message,
    description: 'Deletes Book form database by Id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of book to delete'
      }
    },
    resolve: (source, args) => {
      Book.deleteOne({_id: args.id})

      return {message: 'success'}
    }
  }
}

export default deleteBook
