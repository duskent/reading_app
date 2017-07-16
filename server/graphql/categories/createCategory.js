const Category = require('../../db/models/Category')
// Types
const CategoryType = require('../types/CategoryType')
const CategoryInputType = require('../types/CategoryInputType')
// GraphQL
const {GraphQLString} = require('graphql')

const createCategory = {
  createCategory: {
    type: CategoryType,
    description: 'Creates new category in the database',
    args: {
      category: {type: CategoryInputType, description: 'Input category'}
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {category} = args

        Category.create(category, (err, newCategory) => {
          if (err) reject(err)
          else resolve(newCategory)
        })
      })
    }
  }
}

module.exports = createCategory
