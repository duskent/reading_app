const {GraphQLObjectType, GraphQLSchema} = require('graphql')
// Categories
const getCategories = require('./categories/getCategories')
const createCategory = require('./categories/createCategory')
const updateCategory = require('./categories/updateCategory')
const deleteCategory = require('./categories/deleteCategory')
// Books
const getBooks = require('./books/getBooks');
const createBook = require('./books/createBook')
// Utils
const _ = require('lodash')

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: _.assign(getCategories, getBooks)
})

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: _.assign(
    createCategory,
    updateCategory,
    deleteCategory,
    createBook
  )
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
