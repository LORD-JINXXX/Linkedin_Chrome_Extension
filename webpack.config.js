const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'),
        background: path.resolve('./src/background/background.js'),
        contentScript: path.resolve('./src/contentScript/contentScript.js')
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx?$/,
                exclude: /node_modules/,

            },

            {
                use: ['style-loader','css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            ident: 'postcss',
                            plugins: [tailwindcss, autoprefixer]
                        }
                    }
                }],
                test: /\.css$/i,

            }
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
            
                {
                    from: path.resolve('public/manifest.json'),
                    to: path.resolve('dist')
                },

                {
                    from: path.resolve('src/images/icon.png'),
                    to: path.resolve('dist')
                },
            ]
        }),

        new HtmlWebpackPlugin({  
            title: "LinkedIn Message Generator",
            filename: 'index.html',
            template:'./public/index.html',          
          })
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js'
    }
}