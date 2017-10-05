import React from 'react'
import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button } from 'reactstrap'
import {Link} from 'react-router-dom'

const BookCard = () => {
  return (
    <div>
      <Card>
        <Link to="/books/some-book">
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=220%C3%97318&w=220&h=318" alt="Card image cap" />
        </Link>
        <CardBlock>
          <CardTitle>Book Title</CardTitle>
          <CardSubtitle>Book Author</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button block outline color="info">Open</Button>
        </CardBlock>
      </Card>
    </div>
  )
}

export default BookCard
