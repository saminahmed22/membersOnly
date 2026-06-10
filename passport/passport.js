const db = require("../db/queires");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const passwordUtils = require("../lib/passwordUtils");

async function verifyCallback(username, password, done) {
  try {
    const user = await db.findUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "No account was found." });
    }

    const isValid = await passwordUtils.validatePassword(password, user.hash);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect username or password." });
    }
  } catch (error) {
    return done(error, { message: "An error occured." });
  }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  const user = await db.findUserByID(user_id);
  try {
    if (user) {
      done(null, user);
    }
  } catch (error) {
    done(error);
  }
});
