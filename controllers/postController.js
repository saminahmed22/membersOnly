const db = require("../db/queires");

const postModel = require("../models/postModel");

const { validationResult } = require("express-validator");

async function renderPostForm(req, res) {
  const formValidationErrors = validationResult(req);
  const allPostData = await db.fetchAllPosts();

  res.render("index", {
    path: "homepage",
    userdata: req.user,
    allPostData,
    postModalOpen: true,
    secretModalOpen: false,
    values: { title: req.body.title, description: req.body.description },
    formValidationErrorMessages: formValidationErrors.array(),
  });
}

async function createPost(req, res) {
  await postModel.createPost(req);

  res.redirect("/");
}

async function deletePost(req, res) {
  await postModel.deletePost(req);

  res.redirect("/");
}

module.exports = { createPost, deletePost, renderPostForm };
