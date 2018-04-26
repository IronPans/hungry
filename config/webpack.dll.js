const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'react-motion',
    'react-router',
    'classnames'
];

module.exports = {
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        'lib': vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
}