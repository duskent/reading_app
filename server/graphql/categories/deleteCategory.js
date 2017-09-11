import Category from '../../db/models/Category'
// Types
import Message from '../types/Message'
// GraphQL
import {GraphQLString} from 'graphql'

const deleteCategory = {
  deleteCategory: {
    type: Message,
    description: 'Deletes category form database by Id',
    args: {
      id: {type: GraphQLString, description: 'Id of category to delete'}
    },
    resolve: (source, args) => {
      Category.deleteOne({_id: args.id})

      return {message: 'success'}
    }
  }
}

export default deleteCategory
