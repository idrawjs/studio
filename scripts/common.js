const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const buildConfig = require('./build-config');

module.exports = {
  createWebpackConfig,
  createWebpackNodeConfig,
}

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

function createWebpackConfig(config) {
  return merge(baseConfig, config);
}

function createWebpackNodeConfig(config) {
  return merge(nodeConfig, config);
}

const baseConfig = {
  module: { 
    rules: [ 
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            'plugins': []
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: buildConfig.deps,
}



const nodeConfig = {
 
  module: { 
    rules: [ 
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: [nodeExternals(), { fs: 'fs', path: 'path' }],
  plugins: [
    // new NodePolyfillPlugin(),
  ],
}