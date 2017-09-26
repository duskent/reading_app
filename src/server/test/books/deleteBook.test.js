import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Book from '../../db/models/Book'

import setupTest from '../util'

beforeEach(() => setupTest())

describe('deleteBook', () => {
  const query = (id) => `
    mutation deleteBook {
      deleteBook(id: "${id}") {
        message
      }
    }
  `

  it('Should remove book from db', async () => {
    const book = new Book({
      author: 'Test Author',
      title: 'Test Title'
    })
    await book.save()

    const result = await graphql(Schema, query(book.id))
    const {data: {deleteBook}} = result

    expect(deleteBook.message).toEqual('success')

    try {
      await Book.findOne({name: 'Test Title'})
    } catch (object) {
      expect(object).toBeNull()
    }
  })
})
