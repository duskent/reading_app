import React from 'react'
import BookDetails from '../src/client/components/BookDetails'
import {BrowserRouter} from 'react-router-dom'
import { storiesOf } from '@kadira/storybook'
import {Container} from 'reactstrap'

const book = {
  author: 'Test Author',
  title: 'Test Title',
  cover: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=220%C3%97318&w=220&h=318',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  finished: false,
  categories: [
    {
      name: 'Test Category',
      slug: 'test-category'
    },
    {
      name: 'Test Category 2',
      slug: 'test-category-2'
    },
  ]
}

const BookDetailsStories = storiesOf('BookDetails', module)
  .add('default', () => {
    return <BrowserRouter>
      <Container>
        <BookDetails book={book}/>
      </Container>
    </BrowserRouter>
  })
  .add('finished', () => {
    return <BrowserRouter>
      <Container>
        <BookDetails book={Object.assign({}, book, {finished: true})}/>
      </Container>
    </BrowserRouter>
  })
  .add('without author', () => {
    return <BrowserRouter>
      <Container>
        <BookDetails book={Object.assign({}, book, {author: null})}/>
      </Container>
    </BrowserRouter>
  })
  .add('without description', () => {
    return <BrowserRouter>
      <Container>
        <BookDetails book={Object.assign({}, book, {description: null})}/>
      </Container>
    </BrowserRouter>
  })
  .add('without categories', () => {
    return <BrowserRouter>
      <Container>
        <BookDetails book={Object.assign({}, book, {categories: []})}/>
      </Container>
    </BrowserRouter>
  })

export default BookDetailsStories
