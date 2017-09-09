const Book = require('../../db/models/Book')
// GraphQLTypes
const BookCategoryType = require('./BookCategoryType')
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = require('graphql')

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category of book',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Mongo ObjectID'
    },
    name: {
      type: GraphQLString,
      description: 'Name of the category'
    },
    slug: {
      type: GraphQLString,
      description: 'Category slug'
    },
    books: {
      name: 'CategoryBook',
      type: new GraphQLList(BookCategoryType),
      description: 'Books included in this catagory',
      resolve: (source, args) => {
        return new Promise((resolve, reject) => {
          const name = source.name

          Book.find({'categories.name': name}, (err, books) => {
            if (err) reject(err)
            else resolve(books)
          })
        })
      }
    }
  })
})

module.exports = CategoryType
