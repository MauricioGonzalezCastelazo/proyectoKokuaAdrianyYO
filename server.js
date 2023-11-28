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
  host: 'kokua-srv.mysql.database.azure.com',
  user: 'kokuamaster', // Your MySQL username
  password: 'ingSoftwareUP2023', // Your MySQL password
  database: 'kokua', // Your MySQL database name
  port: '3306',
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
  pool.query('SELECT * FROM personasapoyo', (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.get('/api/persona-apoyo/contactos:id', (req, res) =>{
  const idPersonaApoyo = req.params.id;
  const query = 'SELECT Distinct pacientes.IDPaciente, pacientes.Nombre, pacientes.Apellido, pacientes.Padecimento, pacientes.EstatusPaciente FROM pacientes, asignaciones, personasapoyo WHERE pacientes.IDPaciente = asignaciones.IDPaciente AND asignaciones.IDPersonaApoyo = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.get('/api/persona-apoyo/user:id', (req, res) =>{
  const idPersonaApoyo = req.params.id;
  const query = 'SELECT Nombre from personasapoyo where IDPersonaApoyo = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
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
const PORT = 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});