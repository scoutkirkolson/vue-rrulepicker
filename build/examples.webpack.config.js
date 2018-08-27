// https://github.com/vuejs/vue-cli/blob/master/docs/build.md#configuration-files
var path                = require('path')
var webpack             = require('webpack')
var urloader            = require('url-loader')
var copy                = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../examples/src/app.js'),
    output: {
        path: path.resolve(__dirname, '../examples/dist'),
        publicPath: '/examples/dist/',
        filename: 'app.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
                use: [
                    'url-loader?name=assets/[name].[ext]',
                ]
            },
        ]

    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new copy([
            {from: path.resolve(__dirname, '../examples/src/index.html'), to: path.resolve(__dirname, '../examples/dist')}
        ])
    ]
};
