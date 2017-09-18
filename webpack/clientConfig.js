const {join} = require('path')
const commonPlugins = require('./commonPlugins')

module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: join(__dirname, 'public'),
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
        options: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
}
