const { body } = require("express-validator");

const validateCreatePostForm = [
  body("title").notEmpty().withMessage("Please enter a title.").trim(),
];

module.exports = { validateCreatePostForm };
