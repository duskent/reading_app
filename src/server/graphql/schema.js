import {GraphQLObjectType, GraphQLSchema} from 'graphql'
// Categories
import getCategory from './categories/getCategory'
import getCategories from './categories/getCategories'
import createCategory from './categories/createCategory'
import updateCategory from './categories/updateCategory'
import deleteCategory from './categories/deleteCategory'
import addBookToCategory from './categories/addBookToCategory'
import removeBookFromCategory from './categories/removeBookFromCategory'
// Books
import getBooks from './books/getBooks'
import getBook from './books/getBook'
import createBook from './books/createBook'
import updateBook from './books/updateBook'
import deleteBook from './books/deleteBook'
import addCategoryToBook from './books/addCategoryToBook'
import removeCategoryFromBook from './books/removeCategoryFromBook'

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: Object.assign({},
    getCategory,
    getCategories,
    getBook,
    getBooks
  )
})

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: Object.assign({},
    createCategory,
    updateCategory,
    deleteCategory,
    addBookToCategory,
    removeBookFromCategory,
    createBook,
    updateBook,
    deleteBook,
    addCategoryToBook,
    removeCategoryFromBook
  )
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema
