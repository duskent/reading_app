import Book from '../../db/models/Book'
// Types
import BookType from '../types/BookType'
import CategoryInputType from '../types/CategoryInputType'
// GraphQL
import {GraphQLString, GraphQLNonNull} from 'graphql'

const addCategoryToBook = {
  addCategoryToBook: {
    type: BookType,
    description: 'Adds new category to book by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      },
      category: {type: CategoryInputType, description: 'Inserted category'}
    },
    resolve: async (source, args) => {
      const {id, category} = args
      const where = {_id: id}
      const push = {$push: {categories: category}}

      const updatedBook = await Book.findOneAndUpdate(where, push, {new: true})

      return updatedBook
    }
  }
}

export default addCategoryToBook
