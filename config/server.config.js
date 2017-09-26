const fs = require('fs')
const {join} = require('path')
const webpack = require('webpack')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: ['babel-polyfill', './src/server/index.js'],
  target: 'node',
  output: {
    path: join(__dirname, '../build'),
    filename: 'server.js'
  },
  externals: nodeModules,
  // plugins
  plugins: [
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
  ],
  //devTool
  devtool: 'source-map',
  // loaders
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
}
