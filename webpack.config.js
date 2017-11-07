// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin') // Import our plugin -> ADDED IN THIS STEP
var CopyWebpackPlugin = require('copy-webpack-plugin')

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'), // source folder path -> ADDED IN THIS STEP
  JS: path.resolve(__dirname, 'src/js'),
  ASSETS: path.resolve(__dirname, 'src/assets')
}

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  // Tell webpack to use html plugin -> ADDED IN THIS STEP
  // index.html is used as a template in which it'll inject bundled app.
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html')
    }),
    new CopyWebpackPlugin([
      {from: paths.ASSETS, to: 'assets/'},
      {from: path.resolve(__dirname, './now.json'), to: './now.json'}
    ])
  ],
  // Loaders configuration -> ADDED IN THIS STEP
  // We are telling webpack to use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     failOnWarning: true,
      //     failOnError: true
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
}
