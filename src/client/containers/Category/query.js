import {gql} from 'react-apollo'

export default gql`
  query getCategory($id: String!) {
    getCategory(id: $id) {
      id
      name
      slug
      books {
        id
        title
        author
      }
    }
  }
`
