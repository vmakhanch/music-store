const slsw = require('serverless-webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack')
    },
    mode: 'development',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts|.js$/,
                use: 'ts-loader',
                exclude: [/node-modules/]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}
