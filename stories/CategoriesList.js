import React from 'react'
import CategoriesList from '../src/client/components/CategoriesList'
import {BrowserRouter} from 'react-router-dom'
import { storiesOf } from '@kadira/storybook'
import {Container, Row, Col} from 'reactstrap'

const data = {
  loading: false,
  getCategories: [
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


const CategoriesListStories = storiesOf('CategoriesList', module)
  .add('default', () => {
    return <BrowserRouter>
      <Container>
        <Row>
          <Col sm="3">
            <CategoriesList data={data}/>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  })

export default CategoriesListStories
