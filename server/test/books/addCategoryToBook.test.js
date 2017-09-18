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

describe('addCategoryToBook', () => {
  const query = (id, name) => `
    mutation addCategoryToBook {
      addCategoryToBook(id: "${id}", category: {name: "${name}"}) {
        id
        title
        author
        slug
        categories {
          name
        }
      }
    }
  `

  it('Should add category to book categories array', async () => {
    const {category, book} = await loadItems()
    const result = await graphql(Schema, query(book.id, category.name))
    const {data: {addCategoryToBook}} = result

    expect(addCategoryToBook.categories.length).toEqual(1)
    expect(addCategoryToBook.categories[0]).toEqual({name: 'Test Category'})
  })

  it('Should not add anything when pass wrong category', async () => {
    const {book} = await loadItems()
    const result = await graphql(Schema, query(book.id, 'wrong_name'))
    const {data: {addCategoryToBook}} = result

    expect(addCategoryToBook.categories.length).toEqual(0)
  })

  it('Should not add anything when pass wrond book id', async () => {
    const {category} = await loadItems()
    const result = await graphql(Schema, query('wrong_id', category.name))
    const {data: {addCategoryToBook}, errors} = result

    expect(addCategoryToBook).toBe(null)
    expect(errors).toBeDefined()
  })
})
