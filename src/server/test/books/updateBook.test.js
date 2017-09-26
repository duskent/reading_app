import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Book from '../../db/models/Book'

import setupTest from '../util'

beforeEach(() => setupTest())

const createBook = async () => {
  const book = new Book({
    title: 'Test Title',
    author: 'Test Author'
  })

  return await book.save()
}

describe('updateBook', () => {
  const query = (id, book) => `
    mutation updateBook {
      updateBook(id: "${id}", book: {title: "${book.title}", author: "${book.author}"}) {
        id
        author
        title
        slug
      }
    }
  `

  it('Should update book name', async () => {
    const newTitle = 'Another title'
    const oldBook = await createBook()

    const result = await graphql(Schema, query(oldBook.id, {author: oldBook.author, title: newTitle}))
    const {data: {updateBook}} = result

    const newBook = await Book.findOne({title: newTitle})
    const OldBookObject = await Book.findOne({title: oldBook.title})

    expect(updateBook.title).toEqual(newTitle)
    expect(OldBookObject).toBeNull()
    expect(newBook).not.toBeNull()
  })

  it('Should automatically change slug property', async () => {
    const newTitle = 'Another title'
    const oldBook = await createBook()

    const result = await graphql(Schema, query(oldBook.id, {title: newTitle, author: oldBook.author}))
    const {data: {updateBook}} = result

    expect(updateBook.slug).not.toEqual(null)
    expect(updateBook.slug).toEqual('test-author-another-title')
  })

  const nullQuery = `
    mutation updateBook {
      updateBook(book: {title: null, author: "Test Author"}) {
        id
        author
        title
        slug
      }
    }
  `

  it('Should not save and return book without title param', async () => {
    await createBook()

    const result = await graphql(Schema, nullQuery)
    const {errors} = result

    expect(errors[0].message).toBeDefined()
  })
})
