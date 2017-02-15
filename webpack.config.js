var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function postCss() {
    return [
        require('postcss-cssnext')({
            browsers: ['last 2 versions', 'IE > 8']
        })
    ];
}

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/app.ts',
    ],

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        hot: true,
        // enable HMR on the server
        contentBase: path.resolve(__dirname, 'build'),
        // match the output path
        publicPath: '/'
        // match the output `publicPath`
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
        modulesDirectories: [
            path.resolve(__dirname, "./src"),
            "node_modules",
            "lib" // Manually vendored
        ]
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/
            },
            {
                test: /\.(scss|sass)$/,
                loader: ExtractTextPlugin.extract('style-loader', [
                    'css-loader?modules&sourceMap&localIdentName=[local]___[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader?sourceMap',
                ])
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader',
                query: {
                    name: '[hash].[ext]',
                    limit: 10000
                }
            },
            { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=[name].[ext]' },
            { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=[name].[ext]' },
            { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=[name].[ext]' },
            { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]' }
        ]
    },
    postcss: postCss,
    plugins: [
        new ExtractTextPlugin('bundle.css', {
            disable: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
