import React from 'react'
import {Container} from 'reactstrap'
import BookForm from '../../components/BookForm'

const NewBook = () =>
  <Container className="page-container">
    <h1 className="text-center display-4">Create new book</h1>
    <BookForm />
  </Container>

export default NewBook
