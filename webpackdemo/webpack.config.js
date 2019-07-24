var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        library: 'webpackNumbers', // library 能够在各种用户环境(consumption)中可用
        libraryTarget: 'umd' // 让 library 和其他环境兼容
    },
    externals: { //外控
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    }
};