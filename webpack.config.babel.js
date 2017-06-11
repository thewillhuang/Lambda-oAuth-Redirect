// NOTE: paths are relative to each functions folder
import webpack from 'webpack';
import path from 'path';

export default {
  entry: ['./src/index.js'],
  target: 'node',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          plugins: [
            'transform-promise-to-bluebird',
            'transform-runtime',
          ],
          presets: [
            ['env', {
              targets: {
                node: '6.10.2',
                uglify: true,
              },
            }],
            'stage-0',
          ],
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.EnvironmentPlugin({
      ...process.env,
      NODE_ENV: 'production',
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
    }),
  ],
};
