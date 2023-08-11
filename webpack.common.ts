import webpack from 'webpack';
import { join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const REACT_SRC_DIR = join(__dirname, '/client/src');
const REACT_DIST_DIR = join(__dirname, '/client/dist');
const NODE_SRC_DIR = join(__dirname, '/server');
const NODE_DIST_DIR = join(__dirname, '/server/dist');

const serverConfig: webpack.Configuration = {
  entry: {
    server: join(NODE_SRC_DIR, 'index.ts')
  },
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  output: {
    path: NODE_DIST_DIR,
    filename: 'server.js',
    clean: true
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts']
    }
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
};

const clientConfig: webpack.Configuration = {
  entry: join(REACT_SRC_DIR, 'index.tsx'),
  target: 'web',
  output: {
    path: REACT_DIST_DIR,
    filename: '[name].bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts']
    },
    fallback: {
      'process/browser': require.resolve('process/browser')
    }
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new HtmlWebpackPlugin({
      template: join(REACT_SRC_DIR, 'index.html'),
      cache: true
    })
  ]
};

export default [clientConfig, serverConfig];
