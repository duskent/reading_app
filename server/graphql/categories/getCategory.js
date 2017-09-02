const Category = require('../../db/models/Category')
// Types
const CategoryType = require('../types/CategoryType')
// GraphQL
const {
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const getCategory = {
  getCategory: {
    type: CategoryType,
    description: 'Fetch single category by ID',
    args: {
      id: {type: new GraphQLNonNull(GraphQLString), description: 'Id of fetched category'}
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        const {id} = args

        Category.findOne({_id: id}, (err, category) => {
          if (err) reject(err)
          else resolve(category)
        })
      })
    }
  }
}

module.exports = getCategory
