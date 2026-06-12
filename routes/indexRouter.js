const { Router } = require("express");
const indexRouter = Router();

const passport = require("passport");

const { validationResult } = require("express-validator");

// Controllers
const indexController = require("../controllers/indexController");
const uesrLoginController = require("../controllers/uesrLoginController");
const userRegisterController = require("../controllers/userRegisterController");
const postController = require("../controllers/postController");
const secretController = require("../controllers/secretController");

// middlewares
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { validateLoginForm } = require("../middlewares/loginFormValidator");
const {
  validateRegisterForm,
} = require("../middlewares/registerFormValidator");

const {
  validateCreatePostForm,
} = require("../middlewares/createPostFromValidator");

const { validateSecretForm } = require("../middlewares/validateSecretForm");

// Routes
indexRouter.get("/", isAuthenticated, indexController.renderAllPosts);

// Login routes

indexRouter.get(
  "/login",
  (req, res, next) => {
    req.isAuthenticated() ? res.redirect("/") : next();
  },
  uesrLoginController.renderLoginPage,
);

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
indexRouter.get(
  "/register",
  (req, res, next) => {
    req.isAuthenticated() ? res.redirect("/") : next();
  },
  userRegisterController.renderRegisterPage,
);
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

// post routes
indexRouter.post(
  "/createPost",
  isAuthenticated,
  validateCreatePostForm,
  (req, res, next) => {
    const formValidationErrors = validationResult(req);

    if (!formValidationErrors.isEmpty()) {
      return postController.renderPostForm(req, res);
    }

    next();
  },
  postController.createPost,
);

indexRouter.get(
  "/delete-post/:postId",
  isAuthenticated,
  postController.deletePost,
);

// Profile routes
indexRouter.get(
  "/user/:userId",
  isAuthenticated,
  indexController.renderProfilePage,
);

// Secret routes
indexRouter.post(
  "/join-council",
  isAuthenticated,
  validateSecretForm,
  (req, res, next) => {
    const formValidationErrors = validationResult(req);

    if (!formValidationErrors.isEmpty()) {
      return secretController.renderSecretForm(req, res);
    }

    next();
  },
  secretController.addToCouncil,
);

module.exports = indexRouter;
