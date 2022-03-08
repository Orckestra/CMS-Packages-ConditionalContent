const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const babelWhitelist = ['orc-[a-z]+/src', 'ansi-regex', 'strip-ansi', 'connected-react-router', 'react-intl', '@formatjs'];

module.exports = {
  webpack: function (config, env) {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    config.optimization.runtimeChunk = false;
    config.output.filename = 'static/js/conditional-content.js';

    config.plugins.forEach((p, i) => {
      if (p instanceof MiniCssExtractPlugin) {
        config.plugins.splice(
          i,
          1,
          new MiniCssExtractPlugin({
            filename: 'static/css/conditional-content.css',
          })
        );
      }
    });

    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      // Mock api to JSON files
      config.historyApiFallback.rewrites = [
        {
          from: /composite\/api\/(.*)(?<!\.json)$/,
          to: function (context) {
            return `${context.parsedUrl.pathname}.json`;
          },
        },
      ];

      return config;
    };
  },
};
