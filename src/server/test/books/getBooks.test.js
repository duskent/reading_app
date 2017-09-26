import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Book from '../../db/models/Book'

import setupTest from '../util'

beforeEach(() => setupTest())

describe('getBooks', () => {
  const query = '{getBooks {id, title, author, slug}}'

  it('Should return empty array if no values', async () => {
    const result = await graphql(Schema, query)
    const {data: {getBooks}} = result

    expect(getBooks).toEqual([])
  })

  it('Should return array with one element if book exists', async () => {
    const book = new Book({
      title: 'Test Book',
      author: 'Test Author'
    })
    await book.save()

    const result = await graphql(Schema, query)
    const {data: {getBooks}} = result

    expect(getBooks.length).toEqual(1)
    expect(getBooks[0].title).toEqual('Test Book')
  })
})
