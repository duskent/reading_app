import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap'
// Styles
import './styles.css'

const CategoryForm = ({handleSubmit}) => (
  <Container className="form-container">
    <Row>
      <Col sm={{size: 6, offset: 3}}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="text" name="name" id="categoryName" placeholder="Enter category name" />
          </FormGroup>
          <Button block outline color="success">Submit</Button>
        </Form>
      </Col>
    </Row>
  </Container>
)

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default CategoryForm
