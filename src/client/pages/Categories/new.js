import React from 'react'
import {Container} from 'reactstrap'
import CategoryForm from '../../containers/CategoryForm'

const NewCategory = () =>
  <Container className="page-container">
    <h1 className="text-center display-4">Create new category</h1>
    <CategoryForm />
  </Container>

export default NewCategory
