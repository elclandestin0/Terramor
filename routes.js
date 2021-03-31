// require() invokes a function
const routes = require("next-routes")();

// route rules
routes.add("/home/", "/home/index");
routes.add("/home/new", "/home/new/index");

module.exports = routes;