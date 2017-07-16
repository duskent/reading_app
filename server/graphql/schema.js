const {GraphQLObjectType, GraphQLSchema} = require('graphql')
// Categories
const getCategories = require('./categories/getCategories')
const createCategory = require('./categories/createCategory')
const updateCategory = require('./categories/updateCategory')
const deleteCategory = require('./categories/deleteCategory')
// Books
const getBooks = require('./books/getBooks')
const getBook = require('./books/getBook')
const createBook = require('./books/createBook')
const deleteBook = require('./books/deleteBook')
// Utils
const _ = require('lodash')

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: _.assign(getCategories, getBooks, getBook)
})

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: _.assign(
    createCategory,
    updateCategory,
    deleteCategory,
    createBook,
    deleteBook
  )
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
