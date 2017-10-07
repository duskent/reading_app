import React from 'react'
import PropTypes from 'prop-types'
import {Badge, Container, Col, Row} from 'reactstrap'
import CategoriesList from '../CategoriesList'
import './styles.css'

const renderBadge = (finished) => {
  if (finished) {
    return <Badge color="success">Finished</Badge>
  } else {
    return <Badge color="info">Not Finished</Badge>
  }
}

const BookDetails = ({book: {title, author, finished, description, cover, categories}}) => (
  <div className="book-details">
    <h1 className="text-center display-4">{title} - {author} {renderBadge(finished)}</h1>
    <Container>
      <Row>
        <Col sm="3">
          <img className="img-thumbnail" src={cover} alt={`${title} - ${author}`} />
        </Col>
        <Col sm="9">{description ? description : <CategoriesList categories={categories} />}</Col>
      </Row>
      {description && <CategoriesList categories={categories} />}
    </Container>
  </div>
)

BookDetails.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    finished: PropTypes.boolean,
    description: PropTypes.string,
    cover: PropTypes.string
  })
}

export default BookDetails
