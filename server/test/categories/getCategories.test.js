const { graphql } = require('graphql')
const Schema = require('../../graphql/schema')
const Category = require('../../db/models/Category')

const setupTest = require('../util')

beforeEach(() => setupTest())

describe('getCategories', () => {
  const query = '{getCategories {id name, slug}}'

  it('Should return empty array if no values', () => {
    graphql(Schema, query).then(result => {
      const {data: {getCategories}} = result
      expect(getCategories).toEqual([])
    })
  })

  it('Should return array with one element if category exists', () => {
    const name = 'Test Category'
    const category = new Category({name})

    category.save((err) => {
      if (err) throw err

      graphql(Schema, query).then(result => {
        const {data: {getCategories}} = result
        expect(getCategories.length).toEqual(1)
        expect(getCategories[0].name).toEqual(name)
      })
    })
  })

  it('Should automatically create slug property', () => {
    const slug = 'test-category'
    const category = new Category({name: 'Test Category'})

    category.save((err) => {
      if (err) throw err

      graphql(Schema, query).then(result => {
        const {data: {getCategories}} = result
        expect(getCategories[0].slug).not.toEqual(null)
        expect(getCategories[0].slug).toEqual(slug)
      })
    })
  })
})
