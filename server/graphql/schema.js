const {GraphQLObjectType, GraphQLSchema} = require('graphql')
const getCategories = require('./categories/getCategories')

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: getCategories
})

const Schema = new GraphQLSchema({
  query: Query
})

module.exports = Schema
