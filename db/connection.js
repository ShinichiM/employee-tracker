const mysql = require('mysql2');

require('dotenv').config();

// connection
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME}, console.log('Connected to the employee database.')
);

module.exports = db;