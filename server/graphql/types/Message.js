import {GraphQLObjectType, GraphQLString} from 'graphql'

const Message = new GraphQLObjectType({
  name: 'Message',
  description: 'Returing message type',
  fields: {
    message: { type: GraphQLString }
  }
})

export default Message
