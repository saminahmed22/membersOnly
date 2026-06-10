const userModel = require("../models/userModel");

const { validationResult } = require("express-validator");

function renderRegisterPage(req, res) {
  const formValidationErrors = validationResult(req);

  const hasErrors = !formValidationErrors.isEmpty();

  res.status(hasErrors ? 400 : 200).render("authPage", {
    content: "register",
    formValidationErrorMessages: !formValidationErrors.isEmpty()
      ? formValidationErrors.array()
      : [],

    values: {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      username: req?.body?.username,
      password: req?.body?.password,
      rePassword: req?.body?.rePassword,
    },
  });
}

async function registerUser(req, res) {
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  await userModel.createUser(req.body);

  res.redirect("/");
}

module.exports = { renderRegisterPage, registerUser };
