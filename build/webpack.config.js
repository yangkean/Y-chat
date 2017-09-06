const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    filename: process.env.NODE_ENV === 'production' ? '[name].build.js' : 'public/[name].build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: process.env.NODE_ENV === 'production' ? '[hash].[ext]' : 'public/[hash].[ext]'
            }  
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: process.env.NODE_ENV === 'production' ? '[hash].[ext]' : 'public/[hash].[ext]'
            }  
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.css']
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist/'),
    historyApiFallback: true,
    noInfo: true,
    hot: true,
  },
  performance: {
    hints: false
  },
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'y-chat',
      filename: 'views/index.html',
      chunks: ['app'],
      template: 'index.html'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  console.log(process.cwd())
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin('dist', {
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')      
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ])
}
