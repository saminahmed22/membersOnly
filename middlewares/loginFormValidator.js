const { body } = require("express-validator");

const validateLoginForm = [
  body("username")
    .notEmpty()
    .withMessage("Please enter a username.")
    .trim()
    .escape(),

  body("password")
    .notEmpty()
    .withMessage("Please enter the password.")
    .trim()
    .escape(),
];

module.exports = { validateLoginForm };
