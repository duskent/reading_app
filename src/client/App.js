import React from 'react'
import PropTypes from 'prop-types'

const App = ({welcome}) =>
  <h1>{welcome}</h1>

// Props
App.propTypes = {
  welcome: PropTypes.string.isRequired
}

export default App
