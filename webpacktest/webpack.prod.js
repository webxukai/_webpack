const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true   //热更换
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')   //生产环境  NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。
        })
    ]
});