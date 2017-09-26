import Book from '../../db/models/Book'
// GraphQLTypes
import BookCategoryType from './BookCategoryType'
import {GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql'

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category of book',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Mongo ObjectID'
    },
    name: {
      type: GraphQLString,
      description: 'Name of the category'
    },
    slug: {
      type: GraphQLString,
      description: 'Category slug'
    },
    books: {
      name: 'CategoryBook',
      type: new GraphQLList(BookCategoryType),
      description: 'Books included in this catagory',
      resolve: async (source) => {
        const name = source.name

        return await Book.find({'categories.name': name})
      }
    }
  })
})

export default CategoryType
