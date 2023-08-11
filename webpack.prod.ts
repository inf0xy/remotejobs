import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const serverConfig: webpack.Configuration = merge(common[1], {
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin([
      'MONGO_DBNAME',
      'MONGDB_URL',
      'SECRET'
    ])
  ]
});

const clientConfig: webpack.Configuration = merge(common[0], {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    fallback: {
      'process/browser': require.resolve('process/browser')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'APP_URL',
      'UPLOAD_PRESET',
      'CLOUD_NAME',
      'FOLDER_NAME',
      'CLOUDINARY_URL'
    ])
  ]
});

export default [clientConfig, serverConfig];
