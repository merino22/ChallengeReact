const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      fs: false, // or require.resolve('fs-extra'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
    },
  },
};
