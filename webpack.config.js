'use strict'

/* eslint-env node */

const webpack = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const env = process.env.NODE_ENV
const isTest = env === 'test'
const isProd = env === 'production'

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
  new ProgressPlugin({ profile: false }),
]

if (isProd) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  )
}

const externals = isTest
  ? {
      cheerio: 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    }
  : {
      react: 'React',
    }

module.exports = {
  output: {
    library: 'reactFader',
    libraryTarget: 'umd',
  },
  plugins,
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
        test: /\.js$/,
      },
    ],
  },
  externals,
  devtool: 'source-map',
}
