const fs = require('fs')
const {join} = require('path')
const commonPlugins = require('./commonPlugins')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: ['babel-polyfill', './server/index.js'],
  target: 'node',
  output: {
    path: join(__dirname, 'public'),
    filename: 'server.js'
  },
  externals: nodeModules,
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
