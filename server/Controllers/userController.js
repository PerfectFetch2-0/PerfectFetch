const pool = require('../database')
const userController = {};
const bcrypt = require('bcrypt')

// Controller responsible for adding new users to the database.
userController.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  // ! Error Check: Incomplete sign up form.
  if (!name || !email || !password) return res.status(400).send("Sign up form is incomplete.");

  const newUserQuery = 'SELECT email FROM users WHERE email = $1';
  pool.query(newUserQuery, [email], (err, result) => {
    const { rows } = result;
    // ! Error Check: Failed query.
    if (err) {
      console.error(`Error occured while determining is a new user had a unique email. Error: ${err}`);
      return res.status(400).send('An error has occured.')}

    // ! Error Check: Emails must be unique to each user.
    if (rows.length !== 0) {
      console.error('User was not created because email is already in use.');
      return res.status(400).send("This email is already in use.");
    } 
    return;
  });

  // * Error Check Passed: Create a new user.
  const hash = bcrypt.hashSync(password, 10);
  const addUser = 'INSERT INTO users (username, email, password ) VALUES($1, $2, $3) RETURNING *';
  const newUserData = [name, email, hash];
  pool.query(addUser, newUserData, (err, data) => {
    if (err) {
      console.error(`An error occured while encrypting a new user password. Error: ${err}`);
      res.status(500).send('An error has occured.');
    }
    return res.status(200).send("User has been successfully added to the database!");
  });    
  next();
}

// Controller responsible for checking if credentials provided on the log in for are valid.
userController.loginUser = (req, res, next) => {
  const { email, password } = req.body
  console.log('BODY', req.body)
  console.log('PASSWORD', password)
  let userInfo;
  // ! Error Check: Log in form is incomplete.
  if (!email || !password) return res.status(400).send("Log in form is incomplete.");

  const userQuery = 'SELECT email, password FROM users WHERE email = $1';
  pool.query(userQuery, [email], (err, data) => {
    console.log('INSIDE login query')
    const {rows} = data;
    console.log('ROWS', rows)
    // ! Error Check: Failed query.
    if (err) {
      console.error(`Error occured while determining is a new user had a unique email. Error: ${err}`);
      return res.status(400).send('An error has occured.')}
  
    // ! Error Check: Email could not be found in the database.
    if (rows.length === 0) {
      console.log('Login Failed. User could not be found.')
      return res.status(400).send("This email provided could not be found.");
    }
    
    // * Error Checks Passed: Verify user credentials
    bcrypt.compare(password, rows[0].password, (err, result) => {
      if (err) {
        console.log(`An error occured while checking if user password matched the hashed password. Error: ${err}`)
        return res.status(400).send('An error occured while checking your credentials.')
      }
      if (result === true) {
        console.log('User has successfully signed in!')
        return res.status(200).send({isLoggedIn: true})
      }
      console.log('Invalid Password submmitted by user!')
      return res.status(400).send('Invalid password!')
    })
  });
  next();
  }

module.exports = userController