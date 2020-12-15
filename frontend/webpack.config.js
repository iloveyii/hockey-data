const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;
let envKeys = "";

if (env) {
  envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
}

module.exports = {
  entry: "./src/index.js", // Location of main js file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js", // Where the bundle file should be saved
  },
  devServer: {
    // Content root path
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Tell babel which extension files to transpile
        exclude: /node_modules/, // Files to be ignored
        use: {
          loader: "babel-loader", // Specify the babel loader - transpile ES6
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // Create this file in output.path
      template: "./public/index.html", // From this template
    }),
    new webpack.DefinePlugin(envKeys),
  ],
};
