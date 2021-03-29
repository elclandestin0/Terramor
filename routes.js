// require() invokes a function
const routes = require("next-routes")();

// route rules
routes.add("/home/", "/home/index");

module.exports = routes;