const { Router } = require("express");
const indexRouter = Router();

const passport = require("passport");

// Controllers
const indexController = require("../controllers/indexController");
const uesrLoginController = require("../controllers/uesrLoginController");
const userRegisterController = require("../controllers/userRegisterController");

// middlewares
const validatePassword = require("../middlewares/validatePassword");
const middlewares = require("../middlewares/isAuthenticated");

// Routes
indexRouter.get(
  "/",
  middlewares.isAuthenticated,
  indexController.renderAllPosts,
);

// Login routes

indexRouter.get("/login", uesrLoginController.renderLoginPage);

indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    successRedirect: "/login-success",
    failureRedirect: "/login-failure",
  }),
);

indexRouter.get("/login-success", (req, res) => {
  res.redirect("/");
});
indexRouter.get("/login-failure", indexController.denyEntry);

indexRouter.get("/logout", uesrLoginController.logOut);

// Register routes
indexRouter.get("/register", userRegisterController.renderRegisterPage);
indexRouter.post("/register", userRegisterController.registerUser);

module.exports = indexRouter;
