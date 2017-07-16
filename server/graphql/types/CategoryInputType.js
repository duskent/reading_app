const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const CategoryInputType = new GraphQLInputObjectType({
  name: 'CategoryInput',
  description: 'Input category with parameters',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of the category'
    }
  })
})

module.exports = CategoryInputType
