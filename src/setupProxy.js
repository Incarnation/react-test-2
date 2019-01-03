const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/v1/*", { target: "http://localhost:3001/" }));
  app.use(proxy("/api/v1/rentals/*", { target: "http://localhost:3001/" }));
  app.use(proxy("/api/v1/users/*", { target: "http://localhost:3001/" }));
  app.use(proxy("/*.svg", { target: "http://localhost:3001/" }));
};
