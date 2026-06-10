const db = require("../db/queires");

const { validationResult } = require("express-validator");

function renderLoginPage(req, res, next) {
  const passportErrors = req?.flash("error");
  const formValidationErrors = validationResult(req);
  const hasErrors =
    passportErrors.length > 0 || !formValidationErrors.isEmpty();

  res.status(hasErrors ? 400 : 200).render("authPage", {
    content: "login",
    passportErrorMessages: passportErrors.length > 0 ? passportErrors : [],
    formValidationErrorMessages: !formValidationErrors.isEmpty()
      ? formValidationErrors.array()
      : [],
    values: {
      username: req?.body?.username,
      password: req?.body?.password,
    },
  });
}

function logOut(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
}

module.exports = { renderLoginPage, logOut };
