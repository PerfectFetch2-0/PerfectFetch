const session = require("express-session");
const pgStore = require("connect-pg-simple")(session);
const pool = require("./database");

const store = new pgStore({
  pool: pool,
  tableName: "session"
});

module.exports = store;
