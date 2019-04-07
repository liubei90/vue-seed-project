var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    libs: './libs/ajv.bundle.js'
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].js',
    // chunkFilename: '[id].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, './src'),
      '@@': path.join(__dirname, './static'),
      '@modules': path.join(__dirname, './src/modules'),
      '@libs': path.join(__dirname, './libs'),
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
        // exclude: [/node_modules/g],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules/echarts')]
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
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader']
      }
    ],
  },
  externals: {
    // Ajv: 'Ajv'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'dependency',
      chunks: ['index', 'libs'],
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: [path.join(__dirname, 'build')],
    port: 9000,
    // historyApiFallback: true,
  }
}