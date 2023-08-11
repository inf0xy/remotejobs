import webpack from 'webpack';
import { merge } from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common';

const serverConfig: webpack.Configuration = merge(common[1], {
  mode: 'development'
});

const clientConfig: webpack.Configuration = merge(common[0], {
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
    }),
  ]
});

export default [clientConfig, serverConfig];