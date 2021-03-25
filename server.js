const { createServer } = require("http");
const next = require("next");

const app = next({
  dev: process.env.NODE_ENV !== "production",
});

// load the routes ..
const routes = require("./routes");
const handler = routes.getRequestHandler(app);

// create server on the port 3000
app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log("Listening on localhost:3000");
  });
});