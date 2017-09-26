import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Book from '../../db/models/Book'

import setupTest from '../util'

beforeEach(() => setupTest())

describe('createBook', () => {
  const query = (author, title) => `
    mutation createBook {
      createBook(book: {author: "${author}", title: "${title}"}) {
        id
        author
        title
        slug
      }
    }
  `

  it('Should save and return book with title param', async () => {
    const title = 'Test Title'
    const result = await graphql(Schema, query('Test Author', title))
    const {data: {createBook}} = result

    const book = await Book.findOne({title})

    expect(createBook.title).toEqual(title)
    expect(book).not.toBeNull()
  })

  it('Should automatically create slug property', async () => {
    const title = 'Test Title'
    const result = await graphql(Schema, query('Test Author', title))
    const {data: {createBook}} = result

    expect(createBook.slug).not.toBeNull()
    expect(createBook.slug).toEqual('test-author-test-title')
  })

  const nullTitleQuery = `
    mutation createBook {
      createBook(book: {title: null, author: "Test Author"}) {
        id
        author
        title
        slug
      }
    }
  `

  it('Should not save and return book without name title', async () => {
    const result = await graphql(Schema, nullTitleQuery)
    const {errors} = result

    expect(errors[0].message).toBeDefined()
  })

  const nullAuthorQuery = `
    mutation createBook {
      createBook(book: {title: "Test Title", author: null}) {
        id
        author
        title
        slug
      }
    }
  `

  it('Should save and return book without name author', async () => {
    const result = await graphql(Schema, nullAuthorQuery)
    const {data, errors} = result

    expect(errors).not.toBeDefined()
    expect(data).not.toBeNull()
  })
})
