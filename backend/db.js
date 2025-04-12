const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password',
  database: 'insurance_claims',
});

module.exports = pool.promise();