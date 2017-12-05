import BooksList from '../components/BooksList'
// GraphQL
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(gql`
  {
    getBooks {
      author
      title
      slug
      description
      cover
      categories {
        name
      }
    }
  }
`)(BooksList)
