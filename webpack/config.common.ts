/* eslint-disable-next-line import/namespace */
import * as CopyWebpackPlugin from "copy-webpack-plugin"
import * as path from "path"
import * as webpack from "webpack"

import packageJson = require("../package.json")

const config: webpack.Configuration = {
  entry: ["./src/js/index.tsx"],
  output: {
    publicPath: "/",
    path: path.join(__dirname, "../build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: "src/data/o2-annotations.json", to: "o2-annotations.json"},
        {from: "src/data/o3-annotations.json", to: "o3-annotations.json"},
      ],
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
    }),
  ],
}

export default config
