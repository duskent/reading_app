import React from 'react'
import BookCard from '../src/client/components/BookCard'
import {BrowserRouter} from 'react-router-dom'
import { storiesOf, action } from '@kadira/storybook'
import {Container, Row, Col} from 'reactstrap'

const book = {
  author: 'Test Author',
  title: 'Test Title',
  cover: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=220%C3%97318&w=220&h=318',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  slug: 'test-title',
}

const BookCardStories = storiesOf('BookCard', module)
  .add('default', () => {
    return <BrowserRouter>
      <Container>
        <Row>
          <Col sm="3">
            <BookCard
              book={book}
              deleteBook={action('deleteBook triggered')}
            />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  })
  .add('without author', () => {
    return <BrowserRouter>
      <Container>
        <Row>
          <Col sm="3">
            <BookCard
              book={Object.assign({}, book, {author: null})}
              deleteBook={action('deleteBook triggered')}
            />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  })
  .add('without description', () => {
    return <BrowserRouter>
      <Container>
        <Row>
          <Col sm="3">
            <BookCard
              book={Object.assign({}, book, {description: null})}
              deleteBook={action('deleteBook triggered')}
            />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  })

export default BookCardStories
