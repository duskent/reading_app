import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {Link} from 'react-router-dom'
import './styles.css'

const CategoriesList = ({categories}) => (
  <ListGroup className="categories-list">
    {categories.map(category => (
      <ListGroupItem>
        <Link to={`/categories/${category.slug}`}>{category.name}</Link>
      </ListGroupItem>
    ))}
  </ListGroup>
)

CategoriesList.propTypes = {
  categories: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })
}

export default CategoriesList
