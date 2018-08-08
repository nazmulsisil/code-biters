const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [CSSExtract],
  devtool: 'cheap-module-eval-source-map'
};
