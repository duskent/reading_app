import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import CategoryFormComponent from '../components/CategoryForm'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CategoryForm extends Component {
  static propTypes = {
    createCategory: PropTypes.func.isRequired,
    history: PropTypes.object
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const category = {name: e.target.name.value}

    const response = await this.props.createCategory(category)
    const slug = response.data.createCategory.slug

    this.props.history.push(`/categories/${slug}`)
  }

  render() {
    return <CategoryFormComponent handleSubmit={this.handleSubmit} />
  }
}

export default graphql(gql`
  mutation createCategory($category: CategoryInput) {
    createCategory(category: $category) {
      slug
    }
  }
`, {
    props: ({ mutate }) => ({
      createCategory: (category) => mutate({ variables: { category } })
    })
  }
)(withRouter(CategoryForm))
