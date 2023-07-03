const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'hms'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server');
});

module.exports = connection;