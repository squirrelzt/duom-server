const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/entry/index.js'
	},
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
			historyApiFallback:true,
      contentBase: './dist'
		},
    plugins: [
        // new CleanWebpackPlugin(),
    	new HtmlWebpackPlugin({
				favicon:'./src/entry/images/favicon.ico',
							title: '用户管理'
			}),
        new ManifestPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
	],
    output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		},
  module: {
	  rules: [
	    {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
				]
		},{
			test: /\.(png|svg|jpg|gif|ico)$/,
			use: [
				'file-loader'
			]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				'file-loader'
				]
		}, {
			test: /\.(csv|tsv)$/,
			use: [
				'csv-loader'
				]
		}, {
			test: /\.xml$/,
			use: [
				'xml-loader'
				]
		}, {
	  		test: /\.js$/,
			exclude: /node_modules/,
			use: [
				'babel-loader'
			]
		  }
		]
  }
};