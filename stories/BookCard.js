import React from 'react'
import BookCard from '../src/client/components/BookCard'
import {BrowserRouter} from 'react-router-dom'
import { storiesOf } from '@kadira/storybook'
import {Container, Row, Col} from 'reactstrap'

const BookCardStories = storiesOf('BookCard', module)
  .add('default', () => {
    return <BrowserRouter>
      <Container>
        <Row>
          <Col sm="3">
            <BookCard />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  })

export default BookCardStories
