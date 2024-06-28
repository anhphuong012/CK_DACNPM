const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://172.17.90.119:8081",
      changeOrigin: true,
    })
  );
};
