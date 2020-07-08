var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.min.js",
    library: "snap",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
