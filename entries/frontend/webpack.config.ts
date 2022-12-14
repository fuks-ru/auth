import HtmlWebpackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import * as path from 'node:path';
import * as process from 'node:process';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import {
  Configuration,
  EnvironmentPlugin,
  WebpackPluginInstance,
} from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import 'webpack-dev-server';

import { isDevelopment, WEBPACK_PORT } from 'frontend/shared/config/constants';

const env = {
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_AUTH_CLIENT_ID: isDevelopment
    ? '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com'
    : process.env.GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_RECAPTCHA_CLIENT_KEY: isDevelopment
    ? '6Lel8ZcgAAAAAC25K_C-zciG8AM8kmVvm8f1_P09'
    : process.env.GOOGLE_RECAPTCHA_CLIENT_KEY,
};

const plugins: WebpackPluginInstance[] = [
  new HtmlWebpackPlugin({
    template: './src/app/index.html',
  }),
  new NodePolyfillPlugin(),
  new EnvironmentPlugin(env),
  new MiniCssExtractPlugin({
    filename: `styles${isDevelopment ? '' : '-[contenthash]'}.css`,
  }),
  new CopyWebpackPlugin({
    patterns: [{ from: 'src/shared/assets' }],
  }),
];

if (isDevelopment) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

if (!isDevelopment) {
  plugins.push(new ForkTsCheckerWebpackPlugin());
}

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/app/index.tsx',
  output: {
    path: path.resolve(process.cwd(), '../../public/auth'),
    filename: `[name]${isDevelopment ? '' : '-[contenthash]'}.js`,
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: '@linaria/webpack-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: WEBPACK_PORT,
    hot: true,
    historyApiFallback: true,
  },
};

/**
 * Webpack config ?????? ??????????????????????.
 */
export default config;
