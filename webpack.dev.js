const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');


module.exports = (env) =>  {
  return merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: './dist',
      port: 3000,
      hot: true,
      clientLogLevel: "warning",
      proxy: {
        '/api/*': {
          target: 'https://swapi.co/api/',
          secure: false,
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: {'^/api': ''}
        }
      }
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        
      },
    }
  });
}

