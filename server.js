// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

require('dotenv').config();

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up the MySQL connection
const pool = mysql.createPool({
  host: process.env.SERVER_HOST,
  user: process.env.SERVER_USER, // Your MySQL username
  password: process.env.SERVER_PASSWORD, // Your MySQL password
  database: 'kokua', // Your MySQL database name
  port: process.env.SERVER_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  connection.release();
});

// Define a simple route


// Define a test API to fetch data from MySQL
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM `your_table_name`', (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});
app.get('/:url(*)', (req, res) => {
  let url = req.params.url
  console.log(url)
  res.sendFile(path.join(__dirname, 'public/'+ url));
});


app.get('*', (req, res) => {
  let url = req.params.url
  console.log(url)
  res.send("Error");
});



// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});