const {GraphQLObjectType, GraphQLSchema} = require('graphql')
// Categories
const getCategories = require('./categories/getCategories')
const createCategory = require('./categories/createCategory')
const deleteCategory = require('./categories/deleteCategory')
// Books
const createBook = require('./books/createBook')
// Utils
const _ = require('lodash')

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: getCategories
})

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: _.assign(createCategory, deleteCategory, createBook)
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
