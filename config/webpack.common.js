const helpers = require('./helpers');
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const projectName = 'src';

module.exports = (options) => {
    const pkg = require(path.join(process.cwd(), 'package.json'));
    const isProduction = process.env.NODE_ENV === 'message';
    const env = isProduction ? '' : '.dev';
    // const name = (options.env === 'development' || options.env === 'dev') ? pkg.name : `${pkg.name}.min`;
    return {
        /**
         * The entry point for the bundle
         *
         * See: http://webpack.github.io/docs/configuration.html#entry
         */
        entry: {
            main: helpers.root('./' + projectName + '/index' + env + '.tsx'),
            //vendor: helpers.root('./' + projectName + '/vendor.tsx')
        },
        module: {
            strictExportPresence: true,
            rules: [
            ]
        },
        /**
         * Options affecting the resolving of modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve: {
            modules: [helpers.root(projectName), helpers.root('./node_modules')],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            alias: {
                [pkg.name]: process.cwd()
            }
        },
        plugins: [
            new CommonsChunkPlugin({
                names: ['vendor', 'manifest'],
                minChunks: Infinity
            }),
            new HtmlWebpackPlugin({
                title: '外卖',
                chunksSortMode: function (a, b) {
                    const entryPoints = ['vendor', 'main'];
                    return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
                },
                favicon: './favicon.ico',
                stat: isProduction,
                inject: 'body',
                template: './' + projectName + '/index.html',
                hash: true,
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                } : null
            }),
            new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`),
            new webpack.ProgressPlugin((percentage, msg, addInfo) => {
                const stream = process.stderr;
                if (stream.isTTY && percentage < 0.71) {
                    stream.cursorTo(0);
                    stream.write(`☺☺☺  ${chalk.magenta(msg)} (${chalk.magenta(addInfo)})`);
                    stream.clearLine(1);
                } else if (percentage === 1) {
                    console.log(chalk.green('\n ☺☺☺ webpack: bundle build is now finished.'));
                }
            })
        ],
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
    };
};