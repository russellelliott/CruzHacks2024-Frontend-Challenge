const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://schedule-yoyys2e5pq-uc.a.run.app',
      changeOrigin: true,
    })
  );
};
