'use strict'

const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const RemoveConsolePlugin = require('remove-console-webpack-plugin')

let env = process.env.NODE_ENV || 'development'
if (process.env.CIRCLE_BRANCH === 'master') env = 'production'
if (process.env.CI_COMMIT_REF_NAME === 'master') env = 'production'
if (!['development', 'production'].includes(env)) env = 'production'

let publicPath = '/'
if (env === 'production') {
  publicPath = `/${process.env.npm_package_name}`
}
const scope = publicPath

const config = module.exports = {
  mode: env,

  optimization: {
    nodeEnv: env,
    minimize: false
  },

  entry: {
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'env'
          ]
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  output: {
    libraryTarget: 'var',
    library: '[name]',
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    path: path.resolve('./docs'),
    publicPath
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        CI_PROJECT_NAME: JSON.stringify(process.env.CI_PROJECT_NAME || '')
      }
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      inlineSource: '.(js|css)$', // embed all javascript and css inline
      template: 'src/index.html',
      title: '😎 Holiday calendar reminder'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new WebpackPwaManifest({
      publicPath,
      name: '😎 Holiday calendar reminder',
      short_name: '😎 Reminder',
      description: 'Holiday packing reminder using your google calendar',
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      // start_url: scope,
      scope,
      display: 'standalone',
      theme_color: '#ded',
      background_color: '#f9f9f9',
      icons: [
        /* {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }, */
        {
          src: path.resolve('src/img/icon-192.png'),
          size: '192x192' // you can also use the specifications pattern
        },
        {
          src: path.resolve('src/img/icon-512.png'),
          size: '512x512' // you can also use the specifications pattern
        }
      ]
    })
  ],

  recordsPath: path.resolve('/tmp/webpack.json')
}

config.entry.pushups = path.resolve('./src/')
config.entry.sw = path.resolve('./src/sw')

if (process.env.MINIFY) {
  config.plugins.push(new RemoveConsolePlugin({ include: ['*'] }))
  config.optimization.minimize = true
  // if we don't use our own minimizer we can't mangle private props
  config.optimization.minimizer = [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        properties: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        unused: true,
        loops: true,
        hoist_funs: true,
        cascade: true,
        if_return: true,
        join_vars: true,
        drop_debugger: true,
        unsafe: true,
        hoist_vars: true,
        negate_iife: true,
        mangle: {
          properties: {
            regex: /^_/ // only mangle properties that start with underscore
          }
        },
        output: {
          // space_colon: false,
          comments: false
        }
      }
    })
  ]
  var COMMIT_SUFFIX = process.env.COMMIT_HASH || ''
  if (COMMIT_SUFFIX) {
    config.output.filename = `[name].${COMMIT_SUFFIX}.js`
    config.output.sourceMapFilename = `[name].${COMMIT_SUFFIX}.map`
  } else {
    config.output.filename = '[name].min.js'
    config.output.sourceMapFilename = '[name].min.map'
  }
}
