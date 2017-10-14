import React from 'react'
import PropTypes from 'prop-types'
import BookCard from '../BookCard'
import {Row, Container, Col} from 'reactstrap'
import './styles.css'

const BooksList = ({data: {loading, getBooks}}) => {
  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <Container className="books-list">
      <Row>
        {getBooks.map(book => (
          <Col sm="3">
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

BooksList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    getBooks: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        description: PropTypes.string,
        cover: PropTypes.string,
        categories: PropTypes.array,
      })
    ),
  }).isRequired,
}

export default BooksList
