import Category from '../../db/models/Category.js'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'
import CategoryType from './CategoryType'

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book item',
  fields: () => ({
    id: {type: GraphQLString, description: 'Mongo ObjectID'},
    title: {type: new GraphQLNonNull(GraphQLString), description: 'Book title'},
    description: {type: GraphQLString, description: 'Book\'s description'},
    cover: {type: GraphQLString, description: 'Book\'s cover image'},
    author: {type: GraphQLString, description: 'Book\'s author'},
    finished: {type: GraphQLBoolean, description: 'Represents reading status of book'},
    slug: {type: GraphQLString, description: 'Book\'s slug'},
    categories: {
      type: new GraphQLList(CategoryType),
      description: 'Categories in which current book belongs',
      resolve: async (source) => {
        const categoryNames = source.categories.map(c => c.name)

        return await Category.find({name: {$in: categoryNames}})
      }
    }
  })
})

export default BookType
