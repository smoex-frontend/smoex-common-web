var nodeExternals = require('webpack-node-externals')
var fs = require('fs')
var path = require('path')
var dotenv = require('dotenv')
var getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
var { CheckerPlugin } = require('awesome-typescript-loader')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
dotenv.config()

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const appPackageJson = require(resolveApp('package.json'))
const envPublicUrl = process.env.PUBLIC_URL

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/')
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1)
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`
  } else {
    return inputPath
  }
}

const publicPath = ensureSlash(envPublicUrl || appPackageJson.homepage || '/')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build',
    jsonpFunction: `webpackJsonp${appPackageJson.name}`,
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    globalObject: 'this',
    libraryTarget: 'umd',
    publicPath,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['scss', 'css', '.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          {
            loader: 'file-loader',
            options: {
              esModule: true,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.module.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: [nodeExternals()],
  plugins: [
    // new ExtractTextPlugin('./[name].css'),
    new CleanWebpackPlugin(),
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    //  new ForkTsCheckerWebpackPlugin({
    //   typescript: resolve.sync('typescript', {
    //     basedir: './node_modules',
    //   }),
    //   async: false,
    //   useTypescriptIncrementalApi: true,
    //   tsconfig: './tsconfig.json',
    //   reportFiles: [
    //     '**',
    //     '!**/__tests__/**',
    //     '!**/?(*.)(spec|test).*',
    //     '!**/src/setupProxy.*',
    //     '!**/src/setupTests.*',
    //   ],
    //   silent: true,
    //   // The formatter is invoked directly in WebpackDevServerUtils during development
    // }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
}
