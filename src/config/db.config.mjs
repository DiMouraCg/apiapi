import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '15.229.6.170',
  user: 'dimoura',
  password: '214782214782',
  database: 'bolao',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


export default pool;

