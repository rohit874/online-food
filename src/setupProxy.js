
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://online-food-backend-api.herokuapp.com',
      changeOrigin: true,
    })
  );
};