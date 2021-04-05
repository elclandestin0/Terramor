// require() invokes a function
const routes = require("next-routes")();

// route rules
routes.add("/home/", "/home/home");
routes.add("/home/new", "/home/new/new");
routes.add("/camera/", "/camera/camera");

module.exports = routes;