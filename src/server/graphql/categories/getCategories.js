import Category from '../../db/models/Category'
// Types
import CategoryType from '../types/CategoryType'
import {GraphQLList} from 'graphql'

const getCategories = {
  getCategories: {
    type: new GraphQLList(CategoryType),
    description: 'Gets list of all categories',
    resolve: async () => {
      return await Category.find()
    }
  }
}

export default getCategories
