// @tybys/ty version 0.16.3
// https://github.com/toyobayashi/ty

// _useVue: true
// _useVue3: true
// _electronTarget: false
// _webTarget: true
// _nodeTarget: false
// _extractCss: false
// _useSass: false
// _useStylus: false
// _useLess: false
// _useTypeScript: true
// _useESLint: false
// _useBabel: true
// _usePostCss: false
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const context = __dirname
const htmls = [path.join(context, 'public/index.html')]
const webConfig = {
  mode: 'development',
  context: context,
  target: 'web',
  entry: {
    app: [
      path.join(context, 'src/index')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(context, 'dist'),
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      'const': false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false
    },
    publicPath: '/',
    devtoolModuleFilenameTemplate: 'ty:///[resource-path]?[hash]'
  },
  node: false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader')
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              appendTsSuffixTo: [
                /\.vue$/
              ],
              transpileOnly: true,
              configFile: path.join(context, 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader')
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              appendTsSuffixTo: [
                /\.vue$/
              ],
              transpileOnly: true,
              configFile: path.join(context, 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: require.resolve('vue-loader')
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                auto: true,
                localIdentName: '[path][name]__[local]'
              },
              importLoaders: 0
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 4096,
              fallback: {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'img/[name].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 4096,
              fallback: {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'media/[name].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 4096,
              fallback: {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'fonts/[name].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.join(context, 'src')
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.cjs',
      '.js',
      '.jsx',
      '.vue',
      '.css',
      '.json',
      '.wasm'
    ],
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue3-playground',
      template: path.join(context, 'public/index.html'),
      filename: 'index.html',
      minify: false,
      cache: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(context, 'public'),
          to: path.join(context, 'dist'),
          toType: 'dir',
          globOptions: {
            ignore: [
              '**/.gitkeep',
              '**/.DS_Store',
              path.join(context, 'public/index.html').replace(/\\/g, '/')
            ]
          },
          noErrorOnMissing: true
        }
      ]
    }),
    new webpack.DefinePlugin({
      __classPrivateFieldGet: [
        'tslib',
        '__classPrivateFieldGet'
      ],
      __classPrivateFieldSet: [
        'tslib',
        '__classPrivateFieldSet'
      ],
      __VUE_OPTIONS_API__: 'false',
      __VUE_PROD_DEVTOOLS__: 'false'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(context, 'tsconfig.json'),
        extensions: {
          vue: false
        }
      }
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        node_modules: {
          name: 'node-modules',
          test: /[\\/]node_modules[\\/]/,
          priority: -9,
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    stats: {
      colors: true,
      children: false,
      modules: false,
      entrypoints: false
    },
    hot: true,
    host: 'localhost',
    inline: true,
    open: false,
    contentBase: [
      path.join(context, 'dist')
    ],
    publicPath: '/',
    proxy: {},
    before: (_app, server) => {
      htmls.forEach(item => server._watch(item))
    }
  },
  devtool: 'eval-source-map'
}
module.exports = webConfig
