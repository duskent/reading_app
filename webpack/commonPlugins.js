const webpack = require('webpack')

const commonPlugins = [
  new webpack.NoEmitOnErrorsPlugin()
]

if (process.env.NODE_ENV === 'production') {
  commonPlugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false
      }
    })
  )
}

module.exports = commonPlugins
