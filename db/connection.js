const mysql = require('mysql2');

// connection
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'}, console.log('Connected to the election database.')
);