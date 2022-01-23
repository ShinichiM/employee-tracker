const mysql = require('mysql2');

// connection
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''}, console.log('Connected to the election database.')
);