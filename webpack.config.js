const webpack = require('webpack'),
      path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
    
module.exports = {
    entry: path.resolve(__dirname, 'client/src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/index.html')
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
}