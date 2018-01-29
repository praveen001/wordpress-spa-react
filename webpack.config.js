module.exports = function(env) {
  var webpackConfig = require(`./webpack.${env.type}.js`);
  return webpackConfig;
}