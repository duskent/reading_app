const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} = require('graphql')
const CategoryInputType = require('./CategoryInputType')

const BookInputType = new GraphQLInputObjectType({
  name: 'BookInput',
  description: 'Book input item',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Book title'
    },
    author: {type: GraphQLString, description: 'Book\'s author'},
    finished: {type: GraphQLBoolean, description: 'Represents reading status of book'},
    categories: {
      type: new GraphQLList(CategoryInputType),
      description: 'Categories in which current book belongs'
    }
  })
})

module.exports = BookInputType
