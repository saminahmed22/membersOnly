const db = require("../db/queires");

const { hashPassword } = require("../lib/passwordUtils");

async function createUser(data) {
  const first_name = data.firstName;
  const last_name = data.lastName;
  const username = data.username;
  const hash = await hashPassword(data.password);

  const image = await db.getImage();
  const profile_picture = image.image_link;
  await db.updateImageCount(image.image_id); //Update image count

  await db.insertUser(first_name, last_name, username, profile_picture, hash);

  return;
}

async function userData(userId, isMember) {
  const userdata = await db.findUserByID(userId);

  const postdata = isMember
    ? await db.findUserPostsByID(userId)
    : await db.findUserPostsByIDWithoutSecret(userId);

  return { userdata, postdata };
}

module.exports = { createUser, userData };
