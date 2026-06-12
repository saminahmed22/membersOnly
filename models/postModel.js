const db = require("../db/queires");

async function createPost(req) {
  const user_id = req.user.user_id;
  const post_title = req.body.title;
  const post_description = req.body.description;
  const category =
    req.user.status === "member" && !!req.body.isSecretPost
      ? "secret"
      : "general";

  await db.createPost(user_id, post_title, post_description, category);

  return;
}

async function deletePost(req) {
  const post_id = req.params.postId;

  await db.deletePost(post_id);

  return;
}

module.exports = { createPost, deletePost };
