const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function validatePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, validatePassword };
