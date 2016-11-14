const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const appSrc = path.join(__dirname, 'src');

let config = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'js/bundle.js'
  },
  // How should webpack resolve paths in import statements
  resolve: {
    root: path.join(__dirname, 'node_modules'), // If not relative, fallback to node_modules
    // If not relative and matches components, images, fonts use these paths
    alias: {
      components: path.join(appSrc, 'components'),
      images: path.join(appSrc, 'assets', 'images'),
      fonts: path.join(appSrc, 'assets', 'fonts')
    }
  },
  module: {
    loaders: [
      // Transform javascript files using babel loader
      {
        test: /\.(js|jsx)$/,
        include: appSrc,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'] // babel understands es6 and JSX syntax
        }
      },
      // Load css in external stylesheet
      // Need publicPath to resolve relative paths of urls in css
      {
        test: /\.css$/,
        include: appSrc,
        loader: ExtractTextPlugin.extract('style-loader','css-loader', {publicPath: '/'})
      },
      // Output font files to build folder
      {
        test: /\.(otf|ttf|woff|woff2|eot|svg)/,
        include: appSrc,
        loader: 'file',
        query: {
          name: 'fonts/[name].[hash:8].[ext]'
        }
      },
      // Output images to the build folder
      {
        test: /\.(jpg|ico|png|gif)$/,
        include: appSrc,
        exclude: /favicon.ico$/,
        loader: 'file',
        query: {
          name: 'images/[name].[hash:8].[ext]'
        }
      },
      // Output favicon to the root of the build folder
      {
        test: /favicon.ico$/,
        include: appSrc,
        loader: 'file',
        query: {
          name: 'favicon.ico'
        }
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new ExtractTextPlugin('css/styles.css')
  ]
};

module.exports = config;
