const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    // assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@templates': path.resolve(__dirname, 'src/templates'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.png$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
    new DotenvWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    // minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    minimizer: [new CssMinimizerPlugin()],
  },
};
