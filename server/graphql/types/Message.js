const {GraphQLObjectType, GraphQLString} = require('graphql')

const Message = new GraphQLObjectType({
  name: 'Message',
  description: 'Returing message type',
  fields: {
    message: { type: GraphQLString }
  }
})

module.exports = Message
