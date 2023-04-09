import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '64.31.47.126',
  user: 'dcontyrol_admin',
  password: '214782Wm#$',
  database: 'dcontrol_bolaoonline',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


export default pool;

