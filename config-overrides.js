/* config-overrides.js */

// const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireSass = require('react-app-rewire-scss');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = function override(config, env) {

  // config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  const _env = dotenv.config().parsed;
  const envKeys = Object.keys(_env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(_env[next]);
    return prev;
  }, {});
  //add Plugin to config
  config.plugins.push(new webpack.DefinePlugin(envKeys));
  //do stuff with the webpack config...
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true 
  })(config, env);

  config = rewireSass(config, env);
  return config;
}