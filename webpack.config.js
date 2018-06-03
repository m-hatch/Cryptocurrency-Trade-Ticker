const webpack = require('webpack');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

module.exports = {
  entry: [
    'react-hot-loader/patch', 
    path.join(__dirname, '/src/index.jsx')
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          { 
            loader: 'css-loader', 
            options: { importLoaders: 1 } 
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: { limit: 10000 }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    contentBase: './dist',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  mode: dev ? 'development' : 'production',
  optimization: !dev ? {
    minimize: true,
  } : {},
  plugins: dev
    ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]
    : [DefinePluginConfig]
};