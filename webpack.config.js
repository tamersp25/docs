const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDirectory = `build-${process.env.ENVIRONMENT || 'local'}`;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, buildDirectory)
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([buildDirectory]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', 'docs'),
        to: path.resolve(__dirname, buildDirectory, 'docs')
      }
    ]),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
