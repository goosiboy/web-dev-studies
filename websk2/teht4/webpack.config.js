var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = {
    context: __dirname + "/src",
    entry: "./index.js",

    output: {
        filename: "app.js",
        path: __dirname + "/dist"
    }
};
