const db = require("../db/queires");

const { validationResult } = require("express-validator");

function renderAllPosts(req, res) {
  res.render("index");
}

module.exports = { renderAllPosts };
