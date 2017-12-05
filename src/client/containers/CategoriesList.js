import CategoriesList from '../components/CategoriesList'
// GraphQL
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(gql`
  {
    getCategories {
      slug
      name
    }
  }
`)(CategoriesList)
