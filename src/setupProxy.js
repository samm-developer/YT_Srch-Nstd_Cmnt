const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/suggest',
    createProxyMiddleware({
      target: 'http://suggestqueries.google.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/suggest': '', // remove /api/suggest prefix
      },
      logLevel: 'debug',
    })
  );
};

