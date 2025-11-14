require('dotenv').config({ path: require('path').join(__dirname, '..', 'backend', '.env') });
const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'edutrack'
  });
  const [rows] = await conn.query('SELECT NOW() as now');
  console.log('Connected. Server time:', rows[0].now);
  await conn.end();
}

main().catch((e) => {
  console.error('DB connection failed:', e.message);
  process.exit(1);
});
