const CategoryType = require('../types/CategoryType')
const {GraphQLList} = require('graphql')
const Category = require('../../db/models/Category')

const getCategories = {
  getCategories: {
    type: new GraphQLList(CategoryType),
    description: 'Gets list of all categories',
    resolve: () => {
      return new Promise((resolve, reject) => {
        Category.find((err, categories) => {
          if (err) reject(err)
          else resolve(categories)
        })
      })
    }
  }
}

module.exports = getCategories
