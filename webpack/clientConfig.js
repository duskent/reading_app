const {join} = require('path')
const webpack = require('webpack')

const commonPlugins = require('./commonPlugins')
const CompressionPlugin = require('compression-webpack-plugin')

commonPlugins.push(new webpack.optimize.OccurrenceOrderPlugin())
commonPlugins.push(new CompressionPlugin({
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.js$|\.html$/,
  threshold: 10240,
  minRatio: 0.8
}))

module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: join(__dirname, '../public'),
    filename: 'client.js'
  },
  // plugins
  plugins: commonPlugins,
  //devTool
  devtool: 'source-map',
  // loaders
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            'transform-runtime',
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements'
          ]
        }
      }
    ]
  }
}
