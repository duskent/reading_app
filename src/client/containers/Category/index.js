import React from 'react'
// GraphQL
import {graphql} from 'react-apollo'
import query from './query'
// Props
import PropTypes from './prop-types'
// Components
import BooksList from '../../components/BooksList'
import {Container} from 'reactstrap'

const Category = ({data}) => {
  if (data.loading) {
    return <h1>Loading</h1>
  }

  return (
    <Container className="page-container">
      <h1 className="text-center display-4">{data.getCategory.name} of the category Page</h1>
      <BooksList books={data.getCategory.books} />
    </Container>
  )
}

Category.propTypes = PropTypes

export default graphql(query, {
  options: () => ({
    variables: {id: "594bce62c6b63422e5f08b8b"},
  })
})(Category)
