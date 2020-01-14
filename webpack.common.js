const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');
const dotenv = require('dotenv');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const currentPath = path.join(__dirname);

  // adding dynamicly new environments and path to .env.files 
  const basePath = currentPath + '/.env';
  const envPath = basePath + '.' + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: ['@babel/polyfill', APP_PATH],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            emitError: true,
            emitWarning: false,
          }
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({ inject: true, template: path.join(APP_PATH, 'index.html') }),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(__dirname, './tsconfig.json')
      }),
      new webpack.DefinePlugin(envKeys),
      new CopyWebpackPlugin([{ from: 'src/static' }]),
    ]
  }
};
