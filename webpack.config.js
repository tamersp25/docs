const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDirectory = `build-${process.env.ENVIRONMENT || 'local'}`;
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, buildDirectory)
  },
  plugins: [
    new CleanWebpackPlugin(),
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
