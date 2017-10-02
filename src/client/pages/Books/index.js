import React from 'react'
import {Container} from 'reactstrap'
import BooksList from '../../components/BooksList'

const Books = () =>
  <Container className="page-container">
    <h1 className="text-center display-4">Books Page</h1>
    <BooksList />
  </Container>

export default Books
