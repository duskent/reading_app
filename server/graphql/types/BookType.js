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
    categories: {
      type: new GraphQLList(CategoryType),
      description: 'Categories in which current book belongs'
    }
  })
})

module.exports = BookType
