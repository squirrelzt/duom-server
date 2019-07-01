const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	optimization: {
		splitChunks: {
		  chunks: 'async',
		  minSize: 30000,
		  maxSize: 0,
		  minChunks: 1,
		  maxAsyncRequests: 5,
		  maxInitialRequests: 3,
		  automaticNameDelimiter: '~',
		  automaticNameMaxLength: 30,
		  name: true,
		  cacheGroups: {
			vendors: {
			  test: /[\\/]node_modules[\\/]/,
			  priority: -10
			},
			default: {
			  minChunks: 2,
			  priority: -20,
			  reuseExistingChunk: true
			}
		  }
		}
	  },
    entry: {
        index: './src/entry/index.js'
	},
	mode: 'production',
	devtool: false,
    plugins: [
    	new HtmlWebpackPlugin({
				favicon:'./src/entry/images/favicon.ico',
				title: '后台管理系统',
				minify:{
					html5:true,
					collapseWhitespace: true,
					preserveLineBreaks: false,
					minifyCSS: true,
					minifyJS: true,
					removeComments: false
				}
			}),
		new ExtractTextPlugin("styles.css"),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp:/\.css$/g,
  			cssProcessor:require('cssnano')
		})
	],
    output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		},
  module: {
	  rules: [
	    {
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
		  },{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
			  fallback: "style-loader",
			  use: "css-loader"
			})
		  }
		]
  }
};