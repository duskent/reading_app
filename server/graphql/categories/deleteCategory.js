const Category = require('../../db/models/Category')
// Types
const CategoryType = require('../types/CategoryType')
const Message = require('../types/Message')
// GraphQL
const {GraphQLString} = require('graphql')

const deleteCategory = {
  deleteCategory: {
    type: Message,
    description: 'Deletes category form database by Id',
    args: {
      id: {type: GraphQLString, description: 'Id of category to delete'}
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        Category.deleteOne({_id: args.id}, (err) => {
          if (err) reject(err)
          else resolve({message: 'success'})
        })
      })
    }
  }
}

module.exports = deleteCategory
