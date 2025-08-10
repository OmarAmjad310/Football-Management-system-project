/* config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};*/

// config/db.js
const { Pool } = require('pg');

// Parse DATABASE_URL and apply SSL settings if needed
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false } // Required for Heroku, Neon, etc.
      : false,
  // Optional performance & stability settings
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30s
  connectionTimeoutMillis: 5000, // time out after 5s if can't connect
});

// Optional: Log when connected
pool.on('connect', () => {
  console.log('🗄️ PostgreSQL connected via connection string');
});

// Optional: Handle pool errors
pool.on('error', (err) => {
  console.error('⚠️ PostgreSQL Pool Error:', err.message);
});

// Export query function
module.exports = {
  query: (text, params) => pool.query(text, params),
};