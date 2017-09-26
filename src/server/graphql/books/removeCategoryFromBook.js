import Book from '../../db/models/Book'
// Types
import BookType from '../types/BookType'
import CategoryInputType from '../types/CategoryInputType'
// GraphQL
import {GraphQLString, GraphQLNonNull} from 'graphql'

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
    resolve: async (source, args) => {
      const {id, category} = args
      const where = {_id: id}
      const pull = {$pull: {categories: category}}

      const updatedBook = await Book.findOneAndUpdate(where, pull, {new: true})

      return updatedBook
    }
  }
}

export default removeCategoryFromBook
