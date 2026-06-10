const { Router } = require("express");
const indexRouter = Router();

const passport = require("passport");

const { validationResult } = require("express-validator");

// Controllers
const indexController = require("../controllers/indexController");
const uesrLoginController = require("../controllers/uesrLoginController");
const userRegisterController = require("../controllers/userRegisterController");

// middlewares
const validatePassword = require("../middlewares/validatePassword");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { validateLoginForm } = require("../middlewares/loginFormValidator");
const {
  validateRegisterForm,
} = require("../middlewares/registerFormValidator");

// Routes
indexRouter.get("/", isAuthenticated, indexController.renderAllPosts);

// Login routes

indexRouter.get("/login", uesrLoginController.renderLoginPage);

indexRouter.post(
  "/login",
  validateLoginForm,
  (req, res, next) => {
    const formValidationErrors = validationResult(req);

    if (!formValidationErrors.isEmpty()) {
      return uesrLoginController.renderLoginPage(req, res, next);
    }

    next();
  },

  passport.authenticate("local", {
    failureFlash: true,
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

indexRouter.get("/logout", uesrLoginController.logOut);

// Register routes
indexRouter.get("/register", userRegisterController.renderRegisterPage);
indexRouter.post(
  "/register",
  validateRegisterForm,
  (req, res, next) => {
    const formValidationErrors = validationResult(req);

    if (!formValidationErrors.isEmpty()) {
      return userRegisterController.renderRegisterPage(req, res, next);
    }

    next();
  },
  userRegisterController.registerUser,
);

module.exports = indexRouter;
