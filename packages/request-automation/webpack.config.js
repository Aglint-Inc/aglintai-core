const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // Update entry point to include .tsx if applicable
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Include ts and tsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // Add postcss-loader here
        ],
      },
      {
        test: /\.(ts|tsx)$/, // Add loader for TypeScript
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@src": path.resolve(__dirname, "src/"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Add TypeScript extensions
  },
};

// const path = require("path");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   mode: "development",
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env", "@babel/preset-react"],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: [
//           "style-loader",
//           "css-loader",
//           "postcss-loader", // Add postcss-loader here
//         ],
//       },
//     ],
//   },
//   devServer: {
//     static: {
//       directory: path.join(__dirname, "dist"),
//     },
//     compress: true,
//     port: 9000,
//     hot: true,
//     devMiddleware: {
//       writeToDisk: true,
//     },
//   },
//   resolve: {
//     alias: {
//       "@components": path.resolve(__dirname, "src/components/"),
//       "@src": path.resolve(__dirname, "src/"),
//     },
//     extensions: [".js", ".jsx"],
//   },
// };
