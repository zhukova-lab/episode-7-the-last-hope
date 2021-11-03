const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill','./index.js'],
        vendors: [
            "webpack-material-design-icons"
            ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'dist')
    },
    optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './layout/index.pug',
            }
        ),
        new HtmlWebpackPugPlugin(),
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.css$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                },
                     'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                },
                     'css-loader',
                     'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,   
                type: 'asset/resource',
                generator: {
                    filename: './images/[name][ext][query]'
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext][query]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                    ]
                },
            }
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                    ]
                },
            }
            },
        ]
    }
}