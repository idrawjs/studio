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

const babelConfig = {
  cacheDirectory: true,
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 11',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    // [
    //   'babel-plugin-import',
    //   {
    //     libraryName: 'idrawStudio',
    //     libraryDirectory: '', // default: lib
    //     style: true,
    //   },
    // ],
    // '@babel/plugin-proposal-optional-chaining',
    // '@babel/plugin-transform-object-assign',
    // '@babel/plugin-proposal-object-rest-spread',
    // '@babel/plugin-proposal-export-default-from',
    // '@babel/plugin-proposal-export-namespace-from',
    // '@babel/plugin-proposal-class-properties',
  ],
};

const baseConfig = {
  module: { 
    rules: [ 
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [],
              happyPackMode: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /pickr.*js/,
        options: babelConfig,
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