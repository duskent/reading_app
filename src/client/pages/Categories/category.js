import React from 'react'
import {Container} from 'reactstrap'
import BooksList from '../../components/BooksList'

const Category = () =>
  <Container className="page-container">
    <h1 className="text-center display-4">Namge of the category Page</h1>
    <BooksList />
  </Container>

export default Category
