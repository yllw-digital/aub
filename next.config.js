module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            if (typeof performance === 'undefined') {
    // Older Node.js
    webpack.performance = require('perf_hooks').performance;
  } else {
    // Browser.
    webpack.performance = performance;
  }
      // Important: return the modified config
      return config
    },
  }