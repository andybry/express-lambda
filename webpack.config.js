const path = require('path')

module.exports = {
  entry: './src/lambda.ts',
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
}