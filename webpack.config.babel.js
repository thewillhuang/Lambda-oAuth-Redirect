// NOTE: paths are relative to each functions folder
import webpack from 'webpack';
import path from 'path';

const {
  client_secret,
  client_id,
  redirect_uri,
  url,
} = process.env;

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
                node: '6.31',
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
      NODE_ENV: 'production',
      client_secret,
      client_id,
      redirect_uri,
      url,
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production'),
    //     client_secret,
    //     client_id,
    //     redirect_uri,
    //     url,
    //   },
    // }),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
    }),
  ],
};
