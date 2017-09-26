import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Book from '../../db/models/Book'

import setupTest from '../util'

beforeEach(() => setupTest())

describe('getBook', () => {
  const query = (id) => `
    {
      getBook(id: "${id}") {
        id
        author
        title
        slug
      }
    }
  `

  it('Should return null value when not found', async () => {
    const result = await graphql(Schema, query('random-id'))
    const {data: {getBook}} = result

    expect(getBook).toEqual(null)
  })

  it('Should receive an error when book not found', async () => {
    const id = 'random-id'
    const result = await graphql(Schema, query(id))
    const {errors} = result

    const expectedMessage = `Could not find Book with id ${id}`

    expect(errors[0].message).toEqual(expectedMessage)
  })

  it('Should return object with one element if category exists', async () => {
    let book = new Book({
      author: 'Test Author',
      title: 'Test Title'
    })
    book = await book.save()

    const result = await graphql(Schema, query(book.id))
    const {data: {getBook}} = result

    expect(getBook.title).toEqual('Test Title')
  })
})
