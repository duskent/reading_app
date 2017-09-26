import React from 'react'
import {Jumbotron, Button} from 'reactstrap'
// Styles
import './styles.css'

const JumbotronComponent = () =>
  <Jumbotron className="main-hero">
    <h1 className="display-3">Welcome to reading application</h1>
    <p className="lead">This is simple application to create book, categories and connect them.</p>
    <hr className="my-2" />
    <p>It helps you order you own reading list and find some interesting reading by interests.</p>
    <p className="lead">
      <Button color="primary">Go to books</Button>
    </p>
  </Jumbotron>

export default JumbotronComponent
