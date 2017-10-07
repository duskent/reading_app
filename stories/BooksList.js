import React from 'react'
import BooksList from '../src/client/components/BooksList'
import {BrowserRouter} from 'react-router-dom'
import { storiesOf } from '@kadira/storybook'
import {Container} from 'reactstrap'

const books = [
  {
    author: 'Test Author',
    title: 'Test Title',
    cover: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=220%C3%97318&w=220&h=318',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    slug: 'test-title',
  },
  {
    author: 'Test Author',
    title: 'Test Title',
    cover: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=220%C3%97318&w=220&h=318',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    slug: 'test-title',
  },
  {
    author: 'Test Author',
    title: 'Test Title',
    cover: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=220%C3%97318&w=220&h=318',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    slug: 'test-title',
  },
]

const BooksListStories = storiesOf('BooksList', module)
  .add('default', () => {
    return <BrowserRouter>
      <Container>
        <BooksList books={books}/>
      </Container>
    </BrowserRouter>
  })

export default BooksListStories
