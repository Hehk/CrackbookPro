const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  entry:  {
    background: './src/Background.bs.js',
    content: './src/Content.bs.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
