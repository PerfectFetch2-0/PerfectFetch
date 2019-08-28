require('dotenv').config()

// client runs one query, then closes the connection. this process can take time! with lots of request, increases the latency of your code
// with pool, your connection is PERSISTENT. your connection with the database and the server is always open. 
const { Pool, Client } = require('pg');
// the connection string below is how we are connection to our database
let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = 'localhost';
} else {
  connectionString = process.env.url;
}

const pool = new Pool({
    connectionString: connectionString
})

module.exports = pool;