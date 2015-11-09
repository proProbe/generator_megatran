var webpack = require('webpack');
var path = require('path');
var APP = __dirname + '/public';

module.exports = {
	context: APP,
	// entry: './index.js',
	output: {
		path: APP,
		filename: 'bundle.js'
	},
	entry:{
		app:['webpack/hot/dev-server', './index.js']
	},
	module:{
		loaders:[
		{test: /\.html$/, loader: 'raw', exclude: /node_modules/},
		// {test: /\.js$/, loader: 'ng-annotate'}
		]
	},
	resolve:{
		root: path.resolve(APP + '/libs'),
		extensions: ['', '.js']
	},
	plugins:[
	// new Webpack.ProvidePlugin({
	// 	// $: "./libs/jquery/dist/jquery.js",
	// 	// jQuery: "./libs/jquery/dist/jquery.js",
	// 	// "window.jQuery": "./libs/jquery/dist/jquery.js"
	// }),
	],
};