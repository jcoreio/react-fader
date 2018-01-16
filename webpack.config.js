'use strict'

const webpack = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const env = process.env.NODE_ENV
const isDev = env === 'development'
const isTest = env === 'test'
const isProd = env === 'production'

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
  new ProgressPlugin({profile: false}),
]

if (isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
}

const externals = isTest
  ? {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  }
  : {
    react: 'React'
  }

module.exports = {
  output: {
    library: 'reactFader',
    libraryTarget: 'umd'
  },
  plugins,
  module: {
    // Suppress warning from mocha: "Critical dependency: the request of a dependency is an expression"
    // @see https://webpack.js.org/configuration/module/#module-contexts
    exprContextCritical: false,
    
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  // Suppress fatal error: Cannot resolve module 'fs'
  // @relative https://github.com/pugjs/pug-loader/issues/8
  // @see https://github.com/webpack/docs/wiki/Configuration#node
  node: {
    fs: 'empty',
  },
  externals,
  devtool: 'source-map'
}

