import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql'

const BookCategoryType = new GraphQLObjectType({
  name: 'BookCategory',
  description: 'Book item',
  fields: () => ({
    id: {type: GraphQLString, description: 'Mongo ObjectID'},
    title: {type: new GraphQLNonNull(GraphQLString), description: 'Book title'},
    author: {type: GraphQLString, description: 'Book\'s author'},
    finished: {type: GraphQLBoolean, description: 'Represents reading status of book'},
    slug: {type: GraphQLString, description: 'Book\'s slug'}
  })
})

export default BookCategoryType
