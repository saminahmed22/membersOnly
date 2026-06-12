const pool = require("./pool");

async function insertUser(
  first_name,
  last_name,
  username,
  profile_picture,
  hash,
) {
  await pool.query(
    "INSERT INTO members_only_users (first_name, last_name, username, profile_picture, hash) VALUES (($1), ($2), ($3), ($4), ($5))",
    [first_name, last_name, username, profile_picture, hash],
  );

  return;
}

async function findUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM members_only_users WHERE username = $1",
    [username],
  );

  return rows[0];
}

async function findUserByID(user_id) {
  const { rows } = await pool.query(
    "SELECT * FROM members_only_users WHERE user_id = $1",
    [user_id],
  );

  return rows[0];
}

async function createPost(
  user_id,
  post_title,
  post_description,
  category = "general",
) {
  const { rows } = await pool.query(
    "INSERT INTO members_only_posts (user_id, post_title, post_description, category) VALUES (($1), ($2), ($3), ($4))",
    [user_id, post_title, post_description, category],
  );

  return rows[0];
}

async function deletePost(post_id) {
  await pool.query("DELETE FROM members_only_posts WHERE post_id = $1", [
    post_id,
  ]);
}

async function fetchAllPosts() {
  const { rows } = await pool.query(
    "SELECT post_id, user_id, post_title, post_description, TO_CHAR(created_at, 'FMDay, FMMonth DD, YYYY') AS created_at, category, first_name, last_name, username, profile_picture, isadmin FROM members_only_posts JOIN members_only_users USING (user_id) ORDER BY members_only_posts.created_at DESC",
  );

  return rows;
}

async function fetchAllPostsWithoutSecrets() {
  const { rows } = await pool.query(
    "SELECT post_id, user_id, post_title, post_description, TO_CHAR(created_at, 'FMDay, FMMonth DD, YYYY') AS created_at, category, first_name, last_name, username, profile_picture, isadmin FROM members_only_posts JOIN members_only_users USING (user_id) WHERE category <> 'secret' ORDER BY members_only_posts.created_at DESC",
  );

  return rows;
}

async function findUserPostsByID(userId) {
  const { rows } = await pool.query(
    "SELECT post_id, user_id, post_title, post_description, TO_CHAR(created_at, 'FMDay, FMMonth DD, YYYY') AS created_at, category, first_name, last_name, username, profile_picture, isadmin FROM members_only_posts JOIN members_only_users USING (user_id) WHERE members_only_posts.user_id = $1 ORDER BY members_only_posts.created_at DESC",
    [userId],
  );
  return rows;
}

async function findUserPostsByIDWithoutSecret(userId) {
  const { rows } = await pool.query(
    "SELECT post_id, user_id, post_title, post_description, TO_CHAR(created_at, 'FMDay, FMMonth DD, YYYY') AS created_at, category, first_name, last_name, username, profile_picture, isadmin FROM members_only_posts JOIN members_only_users USING (user_id) WHERE members_only_posts.user_id = $1 AND category <> 'secret' ORDER BY members_only_posts.created_at DESC",
    [userId],
  );
  return rows;
}

async function getImage() {
  const { rows } = await pool.query(
    "SELECT image_id, image_link FROM members_only_images ORDER BY use_count ASC",
  );

  return rows[0];
}

async function updateImageCount(imageId) {
  await pool.query(
    "UPDATE members_only_images SET use_count = use_count + 1 WHERE image_id = $1",
    [imageId],
  );
}

async function updateUserStatus(userID) {
  await pool.query(
    "UPDATE members_only_users SET status = 'member' WHERE user_id = $1",
    [userID],
  );
}

module.exports = {
  insertUser,
  findUserByUsername,
  findUserByID,
  createPost,
  deletePost,
  fetchAllPosts,
  fetchAllPostsWithoutSecrets,
  findUserPostsByID,
  findUserPostsByIDWithoutSecret,
  getImage,
  updateImageCount,
  updateUserStatus,
};
