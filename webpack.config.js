const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  entry: './src/Background.bs.js',
  output: {
    filename: 'background.build.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
