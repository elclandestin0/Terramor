// require() invokes a function
const routes = require("next-routes")();

// route rules
routes.add("/landmarks/", "/landmarks/landmarks");
routes.add("/landmarks/new", "/landmarks/new/new");
routes.add("/camera/", "/camera/camera");

module.exports = routes;