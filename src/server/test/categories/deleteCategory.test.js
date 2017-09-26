import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Category from '../../db/models/Category'

import setupTest from '../util'

beforeEach(() => setupTest())

describe('deleteCategory', () => {
  const query = (id) => `
    mutation deleteCategory {
      deleteCategory(id: "${id}") {
        message
      }
    }
  `

  it('Should remove category from db', async () => {
    const category = new Category({name: 'Test Category'})
    await category.save()

    const result = await graphql(Schema, query(category.id))
    const {data: {deleteCategory}} = result

    expect(deleteCategory.message).toEqual('success')

    try {
      await Category.findOne({name: 'Test Category'})
    } catch (object) {
      expect(object).toEqual(null)
    }
  })
})
