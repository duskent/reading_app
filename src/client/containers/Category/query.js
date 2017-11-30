import {gql} from 'react-apollo'

export default gql`
  query getCategory($slug: String!) {
    getCategory(slug: $slug) {
      name
      books {
        id
        title
        author
      }
    }
  }
`
