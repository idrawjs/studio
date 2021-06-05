const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelConfig = {
  cacheDirectory: true,
  presets: [
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
    [
      'babel-plugin-import',
      {
        libraryName: 'idrawStudio',
        libraryDirectory: '', // default: lib
        style: true,
      },
    ],
    // '@babel/plugin-proposal-optional-chaining',
    // '@babel/plugin-transform-object-assign',
    // '@babel/plugin-proposal-object-rest-spread',
    // '@babel/plugin-proposal-export-default-from',
    // '@babel/plugin-proposal-export-namespace-from',
    // '@babel/plugin-proposal-class-properties',
  ],
};

/** @type {import('webpack').Configuration} */

module.exports = {
  mode: 'development',
  entry: {
    app: './examples/dev/index.js',
  },
  stats: {
    warningsFilter: /export .* was not found in/,
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.md'],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    disableHostCheck: true,
    hot: true,
    open: true,
  },
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'examples/dev/index.html',
      filename: 'index.html',
      inject: true,
    }),
    new WebpackBar(),
  ],
};
