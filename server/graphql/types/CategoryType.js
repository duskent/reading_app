const {GraphQLObjectType, GraphQLInt, GraphQLString} = require('graphql')

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category of book',
  fields: () => ({
    id: {type: GraphQLString, description: 'Mongo ObjectID'},
    name: {type: GraphQLString, description: 'Name of the category'}
  })
})

module.exports = CategoryType
