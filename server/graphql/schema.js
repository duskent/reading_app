const {GraphQLObjectType, GraphQLSchema} = require('graphql')
const getCategories = require('./categories/getCategories')
const createCategory = require('./categories/createCategory')

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: getCategories
})

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: createCategory
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
