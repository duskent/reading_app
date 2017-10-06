import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap'
import Autocomplete from '../Autocomplete'

const BookForm = () => (
  <Container className="form-container">
    <Row>
      <Col sm={{size: 6, offset: 3}}>
        <Form>
          <FormGroup>
            <Label for="bookTitle">Title</Label>
            <Input type="text" name="title" id="bookTitle" placeholder="Enter book title" />
          </FormGroup>
          <FormGroup>
            <Label for="BookAuthor">Author</Label>
            <Input type="text" name="author" id="BookAuthor" placeholder="Enter book author" />
          </FormGroup>
          <FormGroup>
            <Label for="bookDescription">Description</Label>
            <Input type="textarea" name="description" id="bookDescription" />
          </FormGroup>
          <FormGroup>
            <Label for="bookCover">Cover</Label>
            <Input type="file" name="file" id="bookCover" />
            <FormText color="muted">
              Upload book cover
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="bookCategories">Categories</Label>
            <Autocomplete className="form-control" />
          </FormGroup>
          <Button block outline color="success">Create new book</Button>
        </Form>
      </Col>
    </Row>
  </Container>
)

export default BookForm
