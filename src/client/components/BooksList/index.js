import React from 'react'
import BookCard from '../BookCard'
import {Row, Container, Col} from 'reactstrap'
import './styles.css'

const BooksList = () => (
  <Container className="books-list">
    <Row>
      <Col sm="3">
        <BookCard / >
      </Col>
      <Col sm="3">
        <BookCard />
      </Col>
      <Col sm="3">
        <BookCard />
      </Col>
      <Col sm="3">
        <BookCard />
      </Col>
      <Col sm="3">
        <BookCard />
      </Col>
      <Col sm="3">
        <BookCard />
      </Col>
      <Col sm="3">
        <BookCard />
      </Col>
      <Col sm="3">
        <BookCard />
      </Col>
    </Row>
  </Container>
)

export default BooksList
