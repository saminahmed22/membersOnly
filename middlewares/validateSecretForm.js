const { body } = require("express-validator");

const validateSecretForm = [
  body("secret")
    .notEmpty()
    .withMessage("You must enter the secret to join the coucil!")
    .bail()
    .equals("cat")
    .withMessage("WRONG CODE!")
    .trim()
    .escape(),
];

module.exports = { validateSecretForm };
