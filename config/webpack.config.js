// override ionic-app-scripts config
var config = require('@ionic/app-scripts/config/webpack.config');
var webpack = require('webpack');
var fs = require('fs');

if (fs.existsSync('./config/env.json')) {
  var env = fs.readFileSync('./config/env.json', 'utf8');

  config.dev.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': env
    })
  );

  config.prod.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': env
    })
  );
} else {
  console.warn('env.json not found');
}

module.exports = config;
