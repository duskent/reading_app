import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {Link} from 'react-router-dom'
import './styles.css'

const CategoriesList = ({data}) => {
  if (data.loading) {
    return <h1>Loading</h1>
  }

  console.log(data) //eslint-disable-line

  return (
    <ListGroup className="categories-list">
      {data.getCategories.map(category => (
        <ListGroupItem>
          <Link to={`/categories/${category.slug}`}>{category.name}</Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

CategoriesList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    getCategories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
}

export default CategoriesList
