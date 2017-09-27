import React from 'react'
import {NavLink} from 'react-router-dom'
import {Jumbotron, Col, Row, } from 'reactstrap'
// Styles
import './styles.css'

const JumbotronComponent = () =>
  <Jumbotron className="main-hero">
    <h1 className="display-3">Welcome to reading application</h1>
    <p className="lead">This is simple application to create book, categories and connect them.</p>
    <hr className="my-2" />
    <p>It helps you order you own reading list and find some interesting reading by interests.</p>
    <p className="lead">
      <Row>
        <Col sm={{ size: 6, offset: 1, pull: 2, push: 2 }}>
          <NavLink id="lead-button" className="nav-link btn btn-lg btn-outline-primary btn-block" to="/books">Go to books</NavLink>
        </Col>
      </Row>
    </p>
  </Jumbotron>

export default JumbotronComponent
