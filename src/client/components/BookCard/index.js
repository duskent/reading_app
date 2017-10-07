import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button } from 'reactstrap'
import {Link} from 'react-router-dom'

const DESCRIPTION_LENGTH = 140

const renderDescription = (description, length = DESCRIPTION_LENGTH) => {
  if (description && description.length > length) {
    return description.substr(0, length - 1) + ' ...'
  }

  return description
}

const BookCard = ({book: {author, title, slug, cover, description}, deleteBook}) => {
  return (
    <div>
      <Card>
        <Link to={`/books/${slug}`}>
          <CardImg top width="100%" src={cover} alt={`${title} - ${author}`} />
        </Link>
        <CardBlock>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{author}</CardSubtitle>
          <CardText>{renderDescription(description)}</CardText>
          <Link to={`/books/${slug}/edit`} className="btn btn-outline-info btn-block">Edit</Link>
          <Button block outline color="danger" onClick={deleteBook}>Delete</Button>
        </CardBlock>
      </Card>
    </div>
  )
}

BookCard.propTypes = {
  book: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string,
    cover: PropTypes.string,
  }),
  deleteBook: PropTypes.func.isRequired
}

export default BookCard
