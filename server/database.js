require('dotenv').config()

// Pool is used to manage database connections becase it capable of maintiaining a persistent connection betwee the server and the database.
const { Pool, Client } = require('pg');
//the connection string below is how we are connection to our database
// const connectionString = process.env.url

const pool = new Pool({
    connectionString: process.env.url
})

module.exports = pool;