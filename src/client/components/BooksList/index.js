import React from 'react'
import PropTypes from 'prop-types'
import BookCard from '../BookCard'
import {Row, Container, Col} from 'reactstrap'
import './styles.css'

const BooksList = ({books}) => (
  <Container className="books-list">
    <Row>
      {books.map(book => (
        <Col sm="3">
          <BookCard book={book} />
        </Col>
      ))}
    </Row>
  </Container>
)

BooksList.propTypes = {
  books: PropTypes.array
}

export default BooksList
