import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {Link} from 'react-router-dom'
import './styles.css'

const CategoriesList = () => (
  <ListGroup className="categories-list">
    <ListGroupItem><Link to="/categories/category-slug">Cras justo odio</Link></ListGroupItem>
    <ListGroupItem><Link to="/categories/category-slug">Dapibus ac facilisis in</Link></ListGroupItem>
    <ListGroupItem><Link to="/categories/category-slug">Morbi leo risus</Link></ListGroupItem>
    <ListGroupItem><Link to="/categories/category-slug">Porta ac consectetur ac</Link></ListGroupItem>
    <ListGroupItem><Link to="/categories/category-slug">Vestibulum at eros</Link></ListGroupItem>
  </ListGroup>
)

export default CategoriesList
