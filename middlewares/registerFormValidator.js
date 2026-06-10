const db = require("../db/queires");

const { body } = require("express-validator");

const validateRegisterForm = [
  body("firstName")
    .notEmpty()
    .withMessage("Please enter your first name.")
    .trim()
    .escape(),

  body("lastName")
    .notEmpty()
    .withMessage("Please enter your last name.")
    .trim()
    .escape(),

  body("username")
    .notEmpty()
    .withMessage("Please enter a username.")
    .trim()
    .escape()
    .custom(async (value) => {
      const exists = !!(await db.findUserByUsername(value));
      if (exists) {
        throw new Error(
          "This username already exists, try out a different one please.",
        );
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Please enter a strong password.")
    .bail()
    .isStrongPassword({
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
      minLength: 6,
    })
    .withMessage(
      "Password must be at least 6 characters long using a mix of both uppercase and lowercase letters, numbers, and symbols.",
    ),

  body("rePassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

module.exports = { validateRegisterForm };
