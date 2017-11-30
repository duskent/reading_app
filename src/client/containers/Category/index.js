import React from 'react'
// GraphQL
import {graphql} from 'react-apollo'
import query from './query'
// Props
import PropTypes from './prop-types'
// Components
import BookCard from '../../components/BookCard'
import {Container, Row, Col} from 'reactstrap'

const Category = ({data}) => {
  if (data.loading) {
    return <h1>Loading</h1>
  }

  const {getCategory: {name, books}} = data

  return (
    <Container className="page-container">
      <h1 className="text-center display-4">{name} of the category Page</h1>
      <Container className="books-list">
        <Row>
          {books.map(book => (
            <Col sm="3">
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  )
}

Category.propTypes = PropTypes

export default graphql(query, {
  options: ({match: {params: slug}}) => ({
    variables: {slug: slug.slug},
  })
})(Category)
