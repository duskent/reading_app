import PropTypes from 'prop-types'

export default {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    category: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        books: PropTypes.array
      })
    ),
  }).isRequired,
}
