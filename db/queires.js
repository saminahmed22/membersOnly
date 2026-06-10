const pool = require("./pool");

async function insertUser(first_name, last_name, username, hash) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, hash) VALUES (($1), ($2), ($3), ($4))",
    [first_name, last_name, username, hash],
  );

  return;
}

async function findUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows[0];
}

async function findUserByID(user_id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    user_id,
  ]);

  return rows[0];
}

module.exports = { insertUser, findUserByUsername, findUserByID };
