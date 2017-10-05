import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {Link} from 'react-router-dom'
import './styles.css'

const CategoriesList = () => (
  <ListGroup className="categories-list">
    <ListGroupItem><Link to="/#">Cras justo odio</Link></ListGroupItem>
    <ListGroupItem><Link to="/#">Dapibus ac facilisis in</Link></ListGroupItem>
    <ListGroupItem><Link to="/#">Morbi leo risus</Link></ListGroupItem>
    <ListGroupItem><Link to="/#">Porta ac consectetur ac</Link></ListGroupItem>
    <ListGroupItem><Link to="/#">Vestibulum at eros</Link></ListGroupItem>
  </ListGroup>
)

export default CategoriesList
