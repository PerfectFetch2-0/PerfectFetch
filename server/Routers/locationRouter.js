const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const locationController = require('../Controllers/locationController');

// post request adds message data and location data from user to the database.
router.post('/addEvent', userController.grabIDforMeetup, locationController.addInfo, (req, res) => {
  res.status(200).send("A meetup event has been added to the map.")
})

// delete request removes user message and location info from the database.
router.delete('/deleteEvent', locationController.deleteInfo, (req, res) => {
  res.status(200).send("A meetup event has been removed from the map.")  
})

// post request renders user messages and locations from the database to the map
router.patch('/updateEvent', locationController.getAllInfo, (req, res) => {
  res.status(200).send("A meetup event has been removed from the map.")  
})

// post request renders user messages and locations from the database to the map
router.get('/fetchEvents', locationController.getAllInfo, (req, res) => {
  res.status(200).send("The map has been successfully updated.")  
})

module.exports = router;