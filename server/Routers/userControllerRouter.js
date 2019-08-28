const express = require('express');
const router = express.Router();
const locationController = require('../Controllers/locationController');
const userController = require('../Controllers/userController');

//post request that stores users sign up info in our database
router.post('/signup', userController.createUser, (req, res, err) => {
    if (!err) {
        res.status(200).json()
    }
})

//post request that checks users login info against that of the database
router.post('/login', userController.loginUser, (req, res, err) => {
    if (!err) {
        res.status(200).json();
    }
})

module.exports = router;