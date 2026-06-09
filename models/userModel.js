const db = require("../db/queires");

const { hashPassword } = require("../lib/passwordUtils");

async function createUser(data) {
  const first_name = data.firstName;
  const last_name = data.lastName;
  const username = data.username;
  const hash = await hashPassword(data.password);

  console.log(
    `Updated data: \n${JSON.stringify({ first_name, last_name, username, hash })}`,
  );

  await db.insertUser(first_name, last_name, username, hash);

  return;
}

module.exports = { createUser };
