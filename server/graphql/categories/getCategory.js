import Category from '../../db/models/Category'
// Types
import CategoryType from '../types/CategoryType'
// GraphQL
import {GraphQLString, GraphQLNonNull} from 'graphql'

const getCategory = {
  getCategory: {
    type: CategoryType,
    description: 'Fetch single category by ID',
    args: {
      id: {type: new GraphQLNonNull(GraphQLString), description: 'Id of fetched category'}
    },
    resolve: async (source, args) => {
      const {id} = args

      return await Category.findOne({_id: id})
    }
  }
}

export default getCategory
