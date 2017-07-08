const CategoryType = require('../types/CategoryType')
const Category = require('../../db/models/Category')
const {GraphQLString} = require('graphql')

const createCategory = {
  createCategory: {
    type: CategoryType,
    args: {
      name: {type: GraphQLString, description: 'Name of a new category'}
    },
    description: 'Creates new category in the database',
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {name} = args

        if (!name) {
          reject('Specify name of the category')
        }

        const newCategory = {name}

        Category.create(newCategory, (err, category) => {
          if (err) reject(err)
          else resolve(category)
        })
      })
    }
  }
}

module.exports = createCategory
