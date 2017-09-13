import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Category from '../../db/models/Category'

import setupTest from '../util'

beforeEach(() => setupTest())

describe('getCategory', () => {
  const query = (id) => `
    {
      getCategory(id: "${id}") {
        id
        name
        slug
      }
    }
  `

  it('Should return null value when not found', async () => {
    const result = await graphql(Schema, query('random-id'))
    const {data: {getCategory}} = result

    expect(getCategory).toEqual(null)
  })

  it('Should receive an error when category not found', async () => {
    const id = 'random-id'
    const result = await graphql(Schema, query(id))
    const {errors} = result

    const expectedMessage = `Could not find Category with id ${id}`

    expect(errors[0].message).toEqual(expectedMessage)
  })

  it('Should return object with one element if category exists', async () => {
    const name = 'Test Category'

    let category = new Category({name})
    category = await category.save()

    const result = await graphql(Schema, query(category.id))
    const {data: {getCategory}} = result

    expect(getCategory.name).toEqual(name)
  })
})
