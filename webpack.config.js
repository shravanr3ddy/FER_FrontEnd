// webpack.config.js
module.exports = {
    //...
    resolve: {
      fallback: {
        "console": require.resolve("console-browserify"),
        // Add other Node.js core modules here if necessary
      }
    }
  };
  