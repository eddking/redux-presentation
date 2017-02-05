var path = require('path');

module.exports = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ]
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/
            }
        ]
    }
};
