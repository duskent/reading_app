const Category = require('../../db/models/Category.js')
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} = require('graphql')
const CategoryType = require('./CategoryType')

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book item',
  fields: () => ({
    id: {type: GraphQLString, description: 'Mongo ObjectID'},
    title: {type: new GraphQLNonNull(GraphQLString), description: 'Book title'},
    author: {type: GraphQLString, description: 'Book\'s author'},
    finished: {type: GraphQLBoolean, description: 'Represents reading status of book'},
    slug: {type: GraphQLString, description: 'Book\'s slug'},
    categories: {
      type: new GraphQLList(CategoryType),
      description: 'Categories in which current book belongs',
      resolve: (source, args) => {
        const categoryNames = source.categories.map(c => c.name)

        return new Promise((resolve, reject) => {
          Category.find({name: {$in: categoryNames}}, (err, categories) => {
            if (err) reject(err)
            else resolve(categories)
          })
        })
      }
    }
  })
})

module.exports = BookType
