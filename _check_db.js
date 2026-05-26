require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  const [columns] = await connection.query(
    `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT, EXTRA
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'accounts'
     ORDER BY ORDINAL_POSITION`,
    [process.env.DB_NAME]
  );
  console.log("=== Current accounts table structure ===");
  console.table(columns);

  const [rows] = await connection.query('SELECT COUNT(*) as count FROM accounts');
  console.log(`\nTotal rows in accounts table: ${rows[0].count}`);

  await connection.end();
})().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
