// @tybys/ty version 1.0.0-alpha.4
// https://github.com/toyobayashi/ty

// _useVue: true
// _useVue3: true
// _electronTarget: false
// _webTarget: true
// _nodeTarget: false
// _extractCss: true
// _useSass: true
// _useStylus: false
// _useLess: false
// _useBabel: true
// _useVueJsx: true
// _useBabelToTransformTypescript: false
// _useTypeScript: true
// _useESLint: true
// _usePostCss: true
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const context = __dirname
const webConfig = {
  mode: 'production',
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
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false
    },
    devtoolModuleFilenameTemplate: 'ty:///[resource-path]?[hash]'
  },
  node: false,
  module: {
    rules: [
      {
        test: /\.(m|c)?jsx?$/,
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
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                auto: true,
                localIdentName: '[hash:base64]'
              },
              importLoaders: 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {}
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                auto: true,
                localIdentName: '[hash:base64]'
              },
              importLoaders: 2
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {}
          },
          {
            loader: require.resolve('sass-loader'),
            options: {}
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[ext]'
        }
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
      '.scss',
      '.sass',
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      },
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
      __VUE_OPTIONS_API__: 'false',
      __VUE_PROD_DEVTOOLS__: 'false'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        memoryLimit: 4096,
        configFile: path.join(context, 'tsconfig.json'),
        extensions: {
          vue: false
        }
      }
    })
  ],
  stats: {
    colors: true,
    children: false,
    modules: false,
    entrypoints: false
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          ecma: 2018,
          output: {
            comments: false,
            beautify: false
          }
        }
      }),
      new CssMinimizerWebpackPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              mergeLonghand: false,
              cssDeclarationSorter: false
            }
          ]
        }
      })
    ]
  },
  devtool: false
}
module.exports = webConfig
