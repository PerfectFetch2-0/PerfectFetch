const session = require("express-session");
const store = require("../Model/sessionStore.js");
const pgStore = require("connect-pg-simple")(session);
const sessionController = {};

// Controller responsible for creating a session at login or during sign up.
sessionController.createSession = (req, res, next) => {
  // ! Error Check: Failure to access createSession correctly.
  req.session.username = res.locals.username;
  req.session.email = res.locals.email;
  // * Error Check Passed: Cookie and Session ID added to response body and session stored in the database.
  console.log("A session has been successfully created.");
  next();
};

// Controller responsible for verifying if the session ID on the request is valid.
sessionController.verifySession = (req, res, next) => {
  store.get(req.session.id, (error, session) => {
    // ! Error Check: Unable to find provided session id in the database.
    if (error) {
      console.log("The user did not have a valid session ID.");
      res.status(400).send("Please log in!");
    }
    // * Error Check Passed: User will be redirected to the main page of the app.
    console.log("The session has been successfully verified!");
    next();
  });
};

module.exports = sessionController;
