import { graphql } from 'graphql'
import Schema from '../../graphql/schema'
import Category from '../../db/models/Category'

import setupTest from '../util'

beforeEach(() => setupTest())

describe('getCategories', () => {
  const query = '{getCategories {id name, slug}}'

  it('Should return empty array if no values', async () => {
    const result = await graphql(Schema, query)
    const {data: {getCategories}} = result

    expect(getCategories).toEqual([])
  })

  it('Should return array with one element if category exists', async () => {
    const name = 'Test Category'
    const category = new Category({name})

    await category.save()
    const result = await graphql(Schema, query)
    const {data: {getCategories}} = result

    expect(getCategories.length).toEqual(1)
    expect(getCategories[0].name).toEqual(name)
  })

  it('Should automatically create slug property', async () => {
    const slug = 'test-category'
    const category = new Category({name: 'Test Category'})

    await category.save()
    const result = await graphql(Schema, query)
    const {data: {getCategories}} = result

    expect(getCategories[0].slug).not.toEqual(null)
    expect(getCategories[0].slug).toEqual(slug)
  })
})
