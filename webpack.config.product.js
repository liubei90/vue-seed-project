var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, './build_product'),
    filename: '[name].js',
    // chunkFilename: '[id].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, './src'),
      '@@': path.join(__dirname, './static'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [{ loader: 'vue-style-loader' }, { loader: 'css-loader' }],
            less: [{ loader: 'vue-style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }],
            js: [{ loader: 'babel-loader' }],
          },
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader']
      }
    ],
  },
  externals: {
    Ajv: 'Ajv'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index_product.html',
      chunks: ['index'],
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      { 
        from: './libs/**/*',
        to: './' // 如果是相对路径时，是相对于输出的？
      }
    ]),
  ],
}