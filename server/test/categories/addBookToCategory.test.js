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

  return {category, book}
}

describe('addBookToCategory', () => {
  const query = (id, bookId) => `
    mutation addBookToCategory {
      addBookToCategory(id: "${id}", bookId: "${bookId}") {
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

  it('Should add book to category books array', async () => {
    const {category, book} = await loadItems()
    const result = await graphql(Schema, query(category.id, book.id))
    const {data: {addBookToCategory}} = result

    expect(addBookToCategory.books.length).toEqual(1)
    expect(addBookToCategory.books[0]).toEqual({
      author: 'Test Author',
      title: 'Test title'
    })
  })

  it('Should not add anything when pass wrong bookId', async () => {
    const {category} = await loadItems()
    const result = await graphql(Schema, query(category.id, 'wrong_id'))
    const {data: {addBookToCategory}, errors} = result

    expect(addBookToCategory).toBe(null)
    expect(errors).toBeDefined()
  })

  it('Should not add anything when pass wrond category id', async () => {
    const {category} = await loadItems()
    const result = await graphql(Schema, query(category.id, 'wrong_id'))
    const {data: {addBookToCategory}, errors} = result

    expect(addBookToCategory).toBe(null)
    expect(errors).toBeDefined()
  })
})
