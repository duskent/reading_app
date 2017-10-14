import BooksList from '../components/BooksList'
// GraphQL
import { gql, graphql } from 'react-apollo'

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
