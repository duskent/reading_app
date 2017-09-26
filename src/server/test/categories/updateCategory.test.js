import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Category from '../../db/models/Category'

import setupTest from '../util'

beforeEach(() => setupTest())

const createCategory = async () => {
  const name = 'Test Category'
  const category = new Category({name})

  return await category.save()
}

describe('updateCategory', () => {
  const query = (id, name) => `
    mutation updateCategory {
      updateCategory(id: "${id}", category: {name: "${name}"}) {
        id
        name
        slug
      }
    }
  `

  it('Should update category name', async () => {
    const newName = 'Another name'
    const oldCategory = await createCategory()

    const result = await graphql(Schema, query(oldCategory.id, newName))
    const {data: {updateCategory}} = result

    const newCategory = await Category.findOne({name: newName})
    const oldCategoryObject = await Category.findOne({name: oldCategory.name})

    expect(updateCategory.name).toEqual(newName)
    expect(oldCategoryObject).toBeNull()
    expect(newCategory).not.toBeNull()
  })

  it('Should automatically change slug property', async () => {
    const newName = 'Another name'
    const oldCategory = await createCategory()

    const result = await graphql(Schema, query(oldCategory.id, newName))
    const {data: {updateCategory}} = result

    expect(updateCategory.slug).not.toEqual(null)
    expect(updateCategory.slug).toEqual('another-name')
  })

  const nullQuery = `
    mutation updateCategory {
      updateCategory(category: {name: null}) {
        id
        name
        slug
      }
    }
  `

  it('Should not save and return category without name param', async () => {
    await createCategory()

    const result = await graphql(Schema, nullQuery)
    const {errors} = result

    expect(errors[0].message).toBeDefined()
  })
})
