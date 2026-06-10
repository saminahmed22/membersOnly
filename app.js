require("dotenv").config();

const express = require("express");
const app = express();

/*
_________________________Session

 */
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pgPool = require("./db/pool");

const sessionStore = new pgSession({
  pool: pgPool,
  tableName: "user_sessions",
  createTableIfMissing: true,
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  }),
);

/*
_________________________Passport

 */
const passport = require("passport");
const flash = require("connect-flash");

app.use(passport.session());

require("./passport/passport");

app.use(flash());

/*
_________________________View engine

 */
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
_________________________Router

 */

app.use(express.urlencoded({ extended: true }));
const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

/*
_________________________Static assets

 */
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

/*
_________________________Listen port

 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log("Express app port: ", PORT);
});
