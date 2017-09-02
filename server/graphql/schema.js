const {GraphQLObjectType, GraphQLSchema} = require('graphql')
// Categories
const getCategory = require('./categories/getCategory')
const getCategories = require('./categories/getCategories')
const createCategory = require('./categories/createCategory')
const updateCategory = require('./categories/updateCategory')
const deleteCategory = require('./categories/deleteCategory')
// Books
const getBooks = require('./books/getBooks')
const getBook = require('./books/getBook')
const createBook = require('./books/createBook')
const updateBook = require('./books/updateBook')
const deleteBook = require('./books/deleteBook')
const addCategoryToBook = require('./books/addCategoryToBook')
// Utils
const _ = require('lodash')

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: _.assign(
    getCategory,
    getCategories,
    getBook,
    getBooks
  )
})

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: _.assign(
    createCategory,
    updateCategory,
    deleteCategory,
    createBook,
    updateBook,
    deleteBook,
    addCategoryToBook
  )
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
