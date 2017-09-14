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

    const foundCategory = await Category.findOne({_id: category.id})

    expect(await deleteCategory.message).toEqual('success')
    expect(await foundCategory).toEqual(null)
  })
})
