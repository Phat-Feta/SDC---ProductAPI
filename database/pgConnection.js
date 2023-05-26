require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  post: 5432
});

pool.connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err, 'Cannot connect to database');
  });

module.exports = pool;