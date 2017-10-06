import React from 'react'
import {Link} from 'react-router-dom'
import {Container} from 'reactstrap'
import BooksList from '../../components/BooksList'

const Books = () =>
  <Container className="page-container">
    <h1 className="text-center display-4">Books Page</h1>
    <Link to="/books/new">New Book</Link>
    <BooksList />
  </Container>

export default Books
