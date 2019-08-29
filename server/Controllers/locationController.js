const pool = require('../Model/database')
const locationController = {}

// Controller responsible for adding messageID to response body.
locationController.grabMessageID

// Controller responsible for adding meetup events to the database.
locationController.addEvent = () => {
  const userID = res.locals.userID;
  const { email, message, latitude, longitude } = req.locals.body;   
  const addMeetup = 'INSERT INTO meetup(user_id, latitude, longitude, message) VALUES ($1, $2, $3, $4)'
  const eventData = [userID, latitude, longitude, message];
  pool.query(addMeetup, eventData, (error, result) => {
    // ! Error Check
    if (error) {
      console.log(`An error has occured while adding the event to the meetup database. Error: ${error}`);
      res.status(400).send('An error has occured.');
    }
    console.log('Meetup Event has been successfully added to the database!');
    next();
  })
}

// Controller responsible for removing meetup events to the database.
locationController.deleteEvent = () => {


}
//our intention with this getAllInfo method, was to send back info to the front end from the locations table. 
locationController.getAllInfo = (req, res, next) => {
  const joinTables = 'SELECT users.name, locations.latitude, locations.longitude, locations.message FROM users INNER JOIN locations ON users.email = locations.email';
  pool.query(joinTables, (err, data) => {
    if (err) {
      res.status(400).send("data not received")
    } else {
      //...send data back to the front end to be rendered
      //THE LOGIC HERE IS NOT COMPLETE
      //our intention here was to send back to the front end: the users name, their current location, and the message they'd placed on the map. Unfortunately we never got this to work dynamically, and instead ended up hard coding within the front end. If you wanted to get this info sent to the front end to render, it could be implemented here. 
      res.status(200).json(data)
    }
  })
  next();
}


//our intention with this delete info was that users should be able to delete the message they've placed on a map (maybe they solved the problem they were stuck on?)
//we never really got around to implementing this, but started the functionality, so could be something helpful to implement
locationController.deleteInfo = (req, res, next) => {
  const { message, email, latitude, longitude } = req.body
  console.log("req.body: ", req.body)
  if (!message) {
    res.status(400).send("no message!")
  } else {
    const deleteQuery = 'DELETE FROM locations WHERE message=($1) and email=($2) and latitude=($3) and longitude=($4)';
    const deleteValues= [message,email,latitude,longitude]
  }
  next();
}

module.exports = locationController