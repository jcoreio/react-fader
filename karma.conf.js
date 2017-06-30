const webpackConfig = require('./webpack.config')

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: ['test/index.js'],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },
    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map'
    }),
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'json', dir: 'coverage', file: 'coverage.json' }
      ],
    }
  })
}

