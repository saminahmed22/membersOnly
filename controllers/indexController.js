const db = require("../db/queires");

const { validationResult } = require("express-validator");

const userModel = require("../models/userModel");

async function renderAllPosts(req, res) {
  const isMember = req.user.status === "member";

  const allPostData = isMember
    ? await db.fetchAllPosts()
    : await db.fetchAllPostsWithoutSecrets();

  res.render("index", {
    path: "homepage",
    userdata: req.user,
    allPostData,
    postModalOpen: false,
    secretModalOpen: false,
    values: { title: "", desc: "" },
    formValidationErrorMessages: [],
  });
}

async function renderProfilePage(req, res) {
  const userId = req.params.userId;
  const accountData = await db.findUserByID(req.user.user_id);
  const isMember = req.user.status === "member";
  const data = await userModel.userData(userId, isMember);

  res.render("index", {
    path: "profilePage",
    userdata: accountData,
    posterdata: data.userdata,
    postdata: data.postdata,
    postModalOpen: false,
    secretModalOpen: false,
    values: { title: "", desc: "" },
    formValidationErrorMessages: [],
  });
}

module.exports = { renderAllPosts, renderProfilePage };
