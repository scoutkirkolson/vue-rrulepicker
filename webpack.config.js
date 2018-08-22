var path = require('path')
var webpack = require('webpack')
var urloader = require('url-loader')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/sko-rrulepicker.vue',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'sko-rrulepicker.js',
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
            , 'assets': path.resolve(__dirname, '../src/assets')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

/*
module.exports = {
    entry: path.join(__dirname, '../examples/src/app.js'),
    html: {
        template: path.join(__dirname, '../examples/src/index.html')
    },
    webpack: {
        devtool: false,
        output: {
            path: dist,
            publicPath: ''
        }
    }
};
*/

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            sourceMap:true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}