const express = require('express');
const router = express.Router();
const locationController = require('../Controllers/locationController');

// post request adds message data and location data from user to the database.
router.post('/addInfo', locationController.addInfo, (req, res, err) => {
    if (!err) {
        res.status(200).json()
    }
})

// post request renders user messages and locations from the database to the map
router.get('/getAllInfo', locationController.getAllInfo, (req, res, err) => {
    if (!err) {
        res.status(200).json()
    }
})

// delete request removes user message and location info from the database.
router.delete('/deleteInfo', locationController.deleteInfo, (req, res, err) => {
    if (!err) {
        res.status(200).json()
    }
})

module.exports = router;