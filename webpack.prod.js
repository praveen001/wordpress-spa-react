var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'), 
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },

  entry: './app/Index.js',

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    sourceMapFilename: '[name].map'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-2']
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader?modules=true&localIdentName=[name][local][hash:base64:5]"
      })
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'file-loader?name=./images/[name].[ext]'
    }, {
      test: /manifest.json$/,
      loader: 'file-loader?name=manifest.json!web-app-manifest-loader'
    }, {
      test: /service-worker.js$/,
      loader: 'file-loader?name=service-worker.js'
    }, {
      test: /\.pdf$/i,
      loader: 'file-loader?name=./docs/[name].[ext]'
    }, {
      test: /release.json$/,
      loader: 'file-loader?name=[name].[ext]'
    }]
  }, 

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
      minChunks(module, count) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new ExtractTextPlugin('styles/style.css')
  ]
};