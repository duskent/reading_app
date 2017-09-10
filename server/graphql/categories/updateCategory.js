import Category from '../../db/models/Category'
// Types
import CategoryType from '../types/CategoryType'
import CategoryInputType from '../types/CategoryInputType'
// GraphQL
import {GraphQLString, GraphQLNonNull} from 'graphql'

const updateCategory = {
  updateCategory: {
    type: CategoryType,
    description: 'Updates category in the db',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the category you want to update'
      },
      category: {type: CategoryInputType, description: 'Input category'}
    },
    resolve: async (source, args) => {
      const {id, category} = args

      return await Category.findOneAndUpdate({_id: id}, category, {new: true})
    }
  }
}

export default updateCategory
