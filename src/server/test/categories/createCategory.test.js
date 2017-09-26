import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Category from '../../db/models/Category'

import setupTest from '../util'

beforeEach(() => setupTest())

describe('createCategory', () => {
  const query = (name) => `
    mutation createCategory {
      createCategory(category: {name: "${name}"}) {
        id
        name
        slug
      }
    }
  `

  it('Should save and return category with name param', async () => {
    const name = 'Test Category'

    const result = await graphql(Schema, query(name))
    const {data: {createCategory}} = result

    const category = await Category.findOne({name})

    expect(createCategory.name).toEqual(name)
    expect(category).not.toEqual(null)
  })

  it('Should automatically create slug property', async () => {
    const name = 'Test Category'

    const result = await graphql(Schema, query(name))
    const {data: {createCategory}} = result

    expect(createCategory.slug).not.toEqual(null)
    expect(createCategory.slug).toEqual('test-category')
  })

  const nullQuery = `
    mutation createCategory {
      createCategory(category: {name: null}) {
        id
        name
        slug
      }
    }
  `

  it('Should not save and return category without name param', async () => {
    const result = await graphql(Schema, nullQuery)
    const {errors} = result
    expect(errors[0].message).not.toEqual(undefined)
  })
})
