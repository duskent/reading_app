import Book from '../../db/models/Book'
import Category from '../../db/models/Category'
// Types
import CategoryType from '../types/CategoryType'
// GraphQL
import {GraphQLString, GraphQLNonNull} from 'graphql'

const removeBookFromCategory = {
  removeBookFromCategory: {
    type: CategoryType,
    description: 'Adds new book to category by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the category'
      },
      bookId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      }
    },
    resolve: async (source, args) => {
      const {id, bookId} = args

      const category = await Category.findOne({_id: id})
      const newCategory = {name: category.name}

      const where = {_id: bookId}
      const pull = {$pull: {categories: newCategory}}
      await Book.findOneAndUpdate(where, pull, {new: true})

      return category
    }
  }
}

export default removeBookFromCategory
