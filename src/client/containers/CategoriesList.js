import CategoriesList from '../components/CategoriesList'
// GraphQL
import { gql, graphql } from 'react-apollo'

export default graphql(gql`
  {
    getCategories {
      slug
      name
    }
  }
`)(CategoriesList)
