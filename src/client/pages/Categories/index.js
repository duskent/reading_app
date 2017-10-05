import React from 'react'
import {Container} from 'reactstrap'
import CategoriesList from '../../components/CategoriesList'

const Categories = () =>
  <Container className="page-container">
    <h1 className="text-center display-4">Categories Page</h1>
    <CategoriesList />
  </Container>

export default Categories
