const db = require("../db/queires");

const { validationResult } = require("express-validator");

async function renderSecretForm(req, res) {
  const formValidationErrors = validationResult(req);
  const allPostData = await db.fetchAllPosts();

  res.render("index", {
    path: "homepage",
    userdata: req.user,
    allPostData,
    postModalOpen: false,
    secretModalOpen: true,
    values: {},
    formValidationErrorMessages: formValidationErrors.array(),
  });
}

async function addToCouncil(req, res) {
  const userID = req.user.user_id;

  await db.updateUserStatus(userID);

  res.redirect("/");
}

module.exports = { renderSecretForm, addToCouncil };
