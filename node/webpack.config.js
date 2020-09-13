// webpackは、起点となるJSファイルからimport文を頼りに芋づる式にファイルをつなげていくツール

const path = require('path');

// ビルド時コマンドプロンプトに、処理にかかった総計時間を表示
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin()

const Visualizer = require('webpack-visualizer-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = smp.wrap({
  // モードの設定
  mode: 'development',

  // エントリーポイントの設定
  entry: `../src/index.js`,

  // ファイルの出力設定
  output: {
    // 出力するファイル名
    filename: "bundle.js",

    //  出力先のパス
    path: path.resolve(__dirname, '../dist')
  },

  // バンドル処理の可視化
  plugins: [
    new Visualizer({
      filename: './statistics.html'
    }),
    new MiniCssExtractPlugin({
      filename: './css/index.css',  // /dist/css/sample.cssに出力
    })
  ],

  // ローダーの設定(babel)
  module: {
    rules: [
      {
        // 処理対象ファイル
        test: /\.js$/,

        // 処理対象から外すファイル
        exclude: /node_modules/,
        use: [
          {
            // 利用するローダー
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', {
                  // 対象のブラウザを指定する
                  "targets": {
                    "ie": 11,
                  },
                  // 必要に応じて応じてpolyfillをかけてくれる
                  "useBuiltIns": "usage",
                  "corejs": 3,
                  "modules": false,
                  "debug": true
                }
                ]
              ],
              // plugins: [
              //   '@babel/plugin-transform-runtime'
              // ],
            }
          }
        ]
      },
      {
        // scss,css,sassの設定
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
              // Sass+PostCSSの場合は2を指定
              importLoaders: 2
            }
          },
          // PostCSSのための設定
          {
            loader: "postcss-loader",
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require("autoprefixer")({
                    grid: true
                  })
                ]
              }
            }
          },
          // Sassをバンドルするための機能
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: true
            }
          },
        ]
      },
    ]
  },

  // webpack-dev-serverの設定
  devServer: {
    contentBase: path.join(__dirname, '../'),
    open: true,
    host: '0.0.0.0',
    useLocalIp: true
  }
});

