const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/api/*", { target: "https://online-food-backend-api.herokuapp.com" }));
};