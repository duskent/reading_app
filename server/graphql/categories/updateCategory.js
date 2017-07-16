const Category = require('../../db/models/Category')
// Types
const CategoryType = require('../types/CategoryType')
const CategoryInputType = require('../types/CategoryInputType')
// GraphQL
const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

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
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {id, category} = args

        Category.findOneAndUpdate({_id: id}, category, {new: true}, (err, updatedCategory) => {
          if (err) reject(err)
          else resolve(updatedCategory)
        })
      })
    }
  }
}

module.exports = updateCategory
