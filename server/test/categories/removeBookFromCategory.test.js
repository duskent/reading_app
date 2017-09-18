import { graphql } from 'graphql'
import Schema from '../../graphql/schema'

import Category from '../../db/models/Category'
import Book from '../../db/models/Book'

import setupTest from '../util'

beforeEach(() => setupTest())

const loadItems = async () => {
  const name = 'Test Category'
  const category = new Category({name})
  const bookObject = {
    author: 'Test Author',
    title: 'Test title'
  }

  const book = new Book(bookObject)

  await category.save()
  await book.save()

  await graphql(Schema, `
    mutation addBookToCategory {
      addBookToCategory(id: "${category.id}", bookId: "${book.id}") {
        id
      }
    }
  `)

  return {category, book}
}

describe('removeBookFromCategory', () => {
  const query = (id, bookId) => `
    mutation removeBookFromCategory {
      removeBookFromCategory(id: "${id}", bookId: "${bookId}") {
        id
        name
        slug
        books {
          author
          title
        }
      }
    }
  `

  it('Should remove book from category books array', async () => {
    const {category, book} = await loadItems()
    const result = await graphql(Schema, query(category.id, book.id))
    const {data: {removeBookFromCategory}} = result

    expect(removeBookFromCategory.books.length).toEqual(0)
  })

  it('Should not delete book from db', async () => {
    const {category, book} = await loadItems()
    await graphql(Schema, query(category.id, book.id))

    const foundBook = await Book.findOne({title: book.title})

    expect(foundBook).not.toBe(null)
  })

  it('Should not remove anything when pass wrong bookId', async () => {
    const {category} = await loadItems()
    const result = await graphql(Schema, query(category.id, 'wrong_id'))
    const {data: {removeBookFromCategory}, errors} = result

    expect(removeBookFromCategory).toBe(null)
    expect(errors).toBeDefined()
  })

  it('Should not add anything when pass wrond category id', async () => {
    const {book} = await loadItems()
    const result = await graphql(Schema, query('wrong_id', book.id))
    const {data: {removeBookFromCategory}, errors} = result

    expect(removeBookFromCategory).toBe(null)
    expect(errors).toBeDefined()
  })
})
