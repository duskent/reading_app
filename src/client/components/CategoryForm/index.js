import React from 'react'
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap'
// Styles
import './styles.css'

const CategoryForm = () => (
  <Container className="form-container">
    <Row>
      <Col sm={{size: 6, offset: 3}}>
        <Form>
          <FormGroup>
            <Input type="text" name="name" id="categoryName" placeholder="Enter category name" />
          </FormGroup>
          <Button block outline color="success">Submit</Button>
        </Form>
      </Col>
    </Row>
  </Container>
)

export default CategoryForm
