const Book = require('../../db/models/Book')
// Types
const BookType = require('../types/BookType')
const Message = require('../types/Message');
// GraphQL
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql')

const deteleBook = {
  deteleBook: {
    type: Message,
    description: 'Deletes Book form database by Id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of book to delete'
      }
    },
    resolve: (source, args) => {
      return new Promise((resolve, reject) => {
        Book.deleteOne({_id: args.id}, (err) => {
          if (err) reject(err)
          else resolve({message: 'success'})
        })
      })
    }
  }
}

module.exports = deteleBook
