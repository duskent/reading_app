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
    mutation addCategoryToBook {
      addCategoryToBook(id: "${book.id}", category: {name: "${category.name}"}) {
        id
      }
    }
  `)

  return {category, book}
}

describe('removeCategoryFromBook', () => {
  const query = (id, name) => `
    mutation removeCategoryFromBook {
      removeCategoryFromBook(id: "${id}", category: {name: "${name}"}) {
        id
        author
        title
        slug
        categories {
          name
        }
      }
    }
  `

  it('Should remove category from book categories array', async () => {
    const {category, book} = await loadItems()
    const result = await graphql(Schema, query(book.id, category.name))
    const {data: {removeCategoryFromBook}} = result

    expect(removeCategoryFromBook.categories.length).toEqual(0)
  })

  it('Should not delete category from db', async () => {
    const {category, book} = await loadItems()
    await graphql(Schema, query(book.id, category.name))

    const foundCategory = await Category.findOne({name: category.name})

    expect(foundCategory).not.toBeNull()
  })

  it('Should not remove anything when pass wrong category', async () => {
    const {book} = await loadItems()
    const result = await graphql(Schema, query(book.id, 'wrong_id'))
    const {data: {removeCategoryFromBook}} = result

    expect(removeCategoryFromBook.categories.length).not.toBeNull()
  })
})
