const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        loaders: [
            {test: /\.scss|\.sass|\.css$/, loaders: ["style-loader", "css-loader", "sass-loader"], exclude: /node_modules/},
            {test: /\.ttf$|\.otf$|\.eot$|\.woff$|\.woff2$/, loader: "url-loader?limit=100000"},
            {test: /\.jpe?g$|\.png$/, loader: "file-loader"},
            {test: /\.svg$/, loader: "svg-inline-loader"},
            {test: /load-image/, loader: 'imports?define=>false'},
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.jsx?$/, exclude: /(node_modules)/, loader: 'babel-loader'}
        ]
    },
    output: {
        path: __dirname + "/../dev",
        filename: "bundle.min.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new CopyWebpackPlugin([
            { from: 'static'}
        ])
    ]
};
