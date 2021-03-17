const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const docsRoute = require("./docs.route");
const coworkingSpaceRoute = require("./coworkingspace.route");
const config = require("../../config/config");

/// Define express router
const router = express.Router();

/// Route collection modules 
const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/coworking-spaces",
    route: coworkingSpaceRoute,
  },
];

/// Development route collection module
const devRoutes = [
  {
    path: "/docs",
    route: docsRoute,
  },
];

/// Mapping route collection to default
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/// Mapping development route collection
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
