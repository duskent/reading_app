const {GraphQLObjectType, GraphQLSchema} = require('graphql')
const getCategories = require('./categories/getCategories')
const createCategory = require('./categories/createCategory')
const deleteCategory = require('./categories/deleteCategory')
const _ = require('lodash')

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: getCategories
})

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: _.merge(createCategory, deleteCategory)
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
