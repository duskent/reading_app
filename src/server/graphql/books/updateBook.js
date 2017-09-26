import Book from '../../db/models/Book'
// Types
import BookType from '../types/BookType'
import BookInputType from '../types/BookInputType'
// GraphQL
import {GraphQLString, GraphQLNonNull} from 'graphql'

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
    resolve: async (source, args) => {
      const {id, book} = args

      const updatedBook = await Book.findOneAndUpdate({_id: id}, book, {new: true})

      return updatedBook
    }
  }
}

module.exports = updateBook
