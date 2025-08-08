const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mode: "development",
  target: "web",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "image/[name][ext]",
    publicPath: process.env.PUBLIC_PATH,
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    hot: false,
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ModuleFederationPlugin({
      name: "item_cart",
      filename: "remoteEntry.js",

      remotes: {
        store_remote: `store_remote@${process.env.STORE_REMOTE_URL}`,
      },

      exposes: {
        "./ItemCart": "./src/components/ItemCart",
      },

      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "^19.1.1",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^19.1.1",
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
        },
        "react-redux": {
          singleton: true,
          eager: true,
          requiredVersion: "^9.1.2",
        },
        redux: {
          singleton: true,
          eager: true,
          requiredVersion: "^5.0.1",
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
};
