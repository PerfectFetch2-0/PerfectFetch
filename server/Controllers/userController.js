const bcrypt = require('bcrypt');
const pool = require('../database');

const userController = {};


// Controller responsible for adding new users to the database.
userController.createUser = (req, res, next) => {
  const { name, email, password } = req.body
  // ! Error Check: Incomplete sign up form.
  if (!name || !email || !password) return res.status(400).send("Sign up form is incomplete.");

  const newUserQuery = 'SELECT email FROM users WHERE email = $1';
  pool.query(newUserQuery, [email], (err, res) => {
    const {queryResult} = res;
    // ! Error Check: Failed query.
    if (err) {
      console.error(`Error occured while determining is a new user had a unique email. Error: ${err}`);
      return res.status(400).send('An error has occured.')}

    // ! Error Check: Emails must be unique to each user.
    if (queryResult[0]) return res.status(400).send("This email is already in use.");
  });

  // * Error Check Passed: Create a new user.
  bcrypt.hash(password, 10)
    .then(function (hash) {
      const addUser = 'INSERT INTO users (name, email, password ) VALUES($1, $2, $3) RETURNING *';
      const newUserData = [name, email, hash];
      pool.query(addUser, newUserData, (err, data) => {
      return res.status(200).send("User has been successfully added to the database!");
      });
    }).catch((err) => {
      console.error(`An error occured while encrypting a new user password. Error: ${err}`);
      res.status(500).send(err);
    })
  next();
}

// Controller responsible for checking if credentials provided on the log in for are valid.
userController.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  let userInfo;
  // ! Error Check: Log in form is incomplete.
  if (!email || !password) return res.status(400).send("Log in form is incomplete.");

  const UserQuery = 'SELECT email FROM users WHERE email = $1';
  pool.query(UserQuery, [email], (err, res) => {
    const {queryResult} = res;
    userInfo = queryResult[0];
    // ! Error Check: Failed query.
    if (err) {
      console.error(`Error occured while determining is a new user had a unique email. Error: ${err}`);
      return res.status(400).send('An error has occured.')}
  
    // ! Error Check: Email could not be found in the database.
    if (!queryResult[0]) return res.status(400).send("This email provided could not be found.");
  });

  // * Error Checks Passed: Verify user credentials
  bcrypt.compare(password, userInfo.password, (err, result) => {
    if (result === true) return res.status(200).send({isLoggedIn: true})
    return res.status(400).send('Invalid password!')
  })
    next();
  }

module.exports = userController