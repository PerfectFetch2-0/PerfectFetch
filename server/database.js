require('dotenv').config()

// Pool is used to manage database connections becase it capable of maintiaining a persistent connection betwee the server and the database.
const { Pool, Client } = require('pg');

// Set up placeholder for the database URL string
let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.testurl;
} else {
  connectionString = process.env.url;
}

const pool = new Pool({
  connectionString,
});

module.exports = pool;
