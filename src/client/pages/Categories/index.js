import React from 'react'
import {Container} from 'reactstrap'
import CategoriesList from '../../containers/CategoriesList'
import {Link} from 'react-router-dom'

const Categories = () =>
  <Container className="page-container">
    <h1 className="text-center display-4">Categories Page</h1>
    <Link to="/categories/new">New Category</Link>
    <CategoriesList />
  </Container>

export default Categories
