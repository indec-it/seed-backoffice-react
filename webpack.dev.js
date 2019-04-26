const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: [
            'webpack-hot-middleware/client',
            './src/app'
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            'react-native': 'react-native-web'
        }
    },
    output: {
        path: path.join(__dirname, 'public/assets'),
        publicPath: '/assets/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {plugins: ['react-hot-loader/babel'], cacheDirectory: '.babel-cache'}
        }, {
            test: /\.js$/,
            include: [
                /node_modules\/react-native-/,
                /node_modules\/react-router-native/,
                /node_modules\/@indec/
            ],
            loader: 'babel-loader',
            query: {cacheDirectory: '.babel-cache'}
        }, {
            test: /\.scss$/,
            use: [
                'css-hot-loader',
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader?outputStyle=expanded'
            ]
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader']
        }, {
            exclude: [
                /\.html$/,
                /\.(js|jsx)$/,
                /\.json$/,
                /\.s?css$/,
                /\.(jpg|png)/
            ],
            loader: 'url-loader',
            options: {name: '[name].[ext]', limit: 10000}
        }, {
            test: /\.(jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            VERSION: JSON.stringify(require('./package.json').version),
            ENDPOINT: JSON.stringify(process.env.ENDPOINT),
            AUTH_ENDPOINT: JSON.stringify(process.env.AUTH_ENDPOINT)
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({filename: '[name].css'})
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
