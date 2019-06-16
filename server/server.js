'use strict';
const path = require('path');
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const mockData = require('./mock-data');
const favicon = require('serve-favicon');


const config = require('./../webpack.config.js');
const compiler = webpack(config);
const history = require('connect-history-api-fallback');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(favicon(path.join(__dirname, './../src/entry/images/favicon.ico')));

app.use(history({
    verbose: true,
    index: '/'
}));

app.use(express.static(__dirname + '../src/entry'));

// app.use("/", mockData);

app.get('*/', function(req, res) {
    res.sendFile(path.join(__dirname, './../dist/index.html'));
});


// Serve the files on port 3001.
app.listen(3001, function () {
    console.log('Example app listening on port 3001 .....');
});
