'use strict';
/** Database setup for jobly. */
const { Client } = require('pg');
const { getDatabaseUri } = require('./config');

let db;

if (process.env.NODE_ENV === 'production') {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false, // Disable SSL in development
  });
}

db.connect();

module.exports = db;
