import React from 'react'
import {Badge, Container, Col, Row} from 'reactstrap'
import CategoriesList from '../CategoriesList'
import './styles.css'

const BookDetails = () => (
  <div className="book-details">
    <h1 className="text-center display-4">Title of the book - Author <Badge color="info">Not Finished</Badge></h1>
    <Container>
      <Row>
        <Col sm="3">
          <img className="img-thumbnail" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=220%C3%97318&w=220&h=318" alt="Card image cap" />
        </Col>
        <Col sm="9">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Col>
      </Row>
      <CategoriesList />
    </Container>
  </div>
)

export default BookDetails
