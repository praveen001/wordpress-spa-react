var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var config = {
  entry: './server.js',

  target: 'node',

  output: {
    filename: 'ssr.js',
    path: path.join(__dirname, '/'),
  },

  externals: nodeModules,

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-2']
      },
      exclude: /node_modules/
    }]
  }
};

module.exports = config;