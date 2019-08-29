const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const sessionController = require("../Controllers/sessionController");

//post request that stores users sign up info in our database
router.post(
  "/signup",
  userController.createUser,
  sessionController.createSession,
  (req, res) => {
    res.status(200).send("User and session have both been created.");
  }
);

//post request that checks users login info against that of the database
router.post(
  "/login",
  userController.loginUser,
  sessionController.createSession,
  (req, res) => {
    res.status(200).send("User and session have both been created.");
  }
);

module.exports = router;
