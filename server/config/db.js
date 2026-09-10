const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool for better performance and connection management
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'codeconnects',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection on startup (with retries for Docker startup ordering)
async function testConnection(retries = 10, delayMs = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await pool.getConnection();
      console.log('✅ MySQL database connected successfully');
      connection.release();
      return;
    } catch (error) {
      console.error(`❌ MySQL connection failed (attempt ${attempt}/${retries}):`, error.message);
      if (attempt === retries) {
        console.error('❌ Could not connect to MySQL after retries. Exiting.');
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

module.exports = { pool, testConnection };
