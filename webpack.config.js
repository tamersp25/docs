const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const { DefinePlugin } = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.ENVIRONMENT || 'local';
const buildDirectory = `build-${env}`;

// Build app config
const configPath = `config-${env}.json`;
const config = _.pick(
  JSON.parse(fs.readFileSync(configPath, 'utf8')),
  JSON.parse(fs.readFileSync('configWhitelist.json', 'utf8'))
);

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, buildDirectory)
  },
  node: {
    fs: 'empty'
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
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([buildDirectory]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', 'docs'),
        to: path.resolve(__dirname, buildDirectory, 'docs')
      },
      {
        from: path.resolve(__dirname, 'schemas', 'api'),
        to: path.resolve(__dirname, buildDirectory, 'schemas', 'api')
      },
      {
        from: path.resolve(
          __dirname,
          'node_modules',
          'veritone-json-schemas',
          'schemas',
          'vtn-standard'
        ),
        to: path.resolve(__dirname, buildDirectory, 'schemas', 'vtn-standard')
      }
    ]),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false
    }),

    // Load app config as global
    new DefinePlugin({
      config: JSON.stringify(config)
    })
  ]
};
