const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMerge = require('webpack-merge');
const WebpackBar = require('webpackbar');

const configMode = (env) => require(`./configs/${env.mode}.config`)(env);

module.exports = (env) =>
  webpackMerge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, 'src'),
      entry: './task.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              },
            ],
          },
          {
            test: /\.svg/,
            use: {
              loader: 'svg-url-loader',
            },
          },
          {
            test: /\.html$/,
            use: 'html-loader',
          },
          { test: /\.hbs$/, use: 'handlebars-loader' },
        ],
      },
      plugins: [new CleanWebpackPlugin(), new WebpackBar()],
    },
    configMode(env),
  );
