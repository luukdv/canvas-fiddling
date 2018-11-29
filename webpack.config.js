const path = require('path')
const Uglify = require('uglifyjs-webpack-plugin')

module.exports = {
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, 'public'),
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new Uglify({
        uglifyOptions: {
          output: { comments: false },
        },
      }),
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
}
