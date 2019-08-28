const express = require('express');
const router = express.Router();
const locationController = require('../Controllers/locationController');
const userController = require('../Controllers/userController');

//post request that checks users login info against that of the database
router.post('/login', userController.loginUser, (req, res, err) => {
    if (!err) {
        res.status(200).json();
    }
})

router.post('/addInfo', locationController.addInfo, (req, res, err) => {
    if (!err) {
        res.status(200).json()
    }
})

router.get('/getAllInfo', locationController.getAllInfo, (req, res, err) => {
    if (!err) {
        res.status(200).json()
    }
})

router.delete('/deleteInfo', locationController.deleteInfo, (req, res, err) => {
    if (!err) {
        res.status(200).json()
    }
})

module.exports = router;