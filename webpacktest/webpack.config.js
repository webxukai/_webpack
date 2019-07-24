const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: [
            'lodash' // 命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致
        ]
    },
    // entry: {
    //     app: './src/index.js',
    // },
    output: {
        filename: '[name].[chunkhash].js', //创建哈希名字
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // cnpm install --save-dev express webpack-dev-middleware
        chunkFilename: '[name].bundle.js',
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
      },
    module: {
        rules: [{
                test: /\.css$/, //样式
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|svg|jpg|gif)$/, //文件
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/, //字体
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), //清除dist中不用的文件
        new HtmlWebpackPlugin({ // 名字
            // title: 'Output Management'
            title: 'Caching'
        }),
        new webpack.NamedModulesPlugin(), //修补依赖
        new webpack.HotModuleReplacementPlugin(), // 热更换
        // new webpack.optimize.CommonsChunkPlugin({  // 代码分离 去除重复代码
        //     name: 'common' // 指定公共 bundle 的名称。
        // })
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //将模块分离到单独的文件中
        }),
        new webpack.HashedModuleIdsPlugin(), //  修复hash
        new WorkboxPlugin.GenerateSW({ //pwa
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    devtool: 'inline-source-map', //代码检查映射
    devServer: {
        contentBase: './dist', //开启服务器
        hot: true //热更换
    },
};