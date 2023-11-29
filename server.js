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

//------------------------------Persona de apoyo------------------------------------------------------------------
app.get('/api/persona-apoyo/contactos:id', (req, res) => {
  const idPersonaApoyo = req.params.id;
  const query = 'SELECT Distinct pacientes.IDPaciente, pacientes.Nombre, pacientes.Apellido, pacientes.Padecimento, pacientes.EstatusPaciente FROM pacientes, asignaciones, personasapoyo WHERE pacientes.IDPaciente = asignaciones.IDPaciente AND asignaciones.IDPersonaApoyo = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.get('/api/persona-apoyo/user:id', (req, res) => {
  const idPersonaApoyo = req.params.id;
  const query = 'SELECT Nombre from personasapoyo where IDPersonaApoyo = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//------------------------------Paciente------------------------------------------------------------------
//-----------------------------Citas-------------------------------------------------------------
app.get('/api/paciente/appointments/:id', (req, res) => {
  const idPersonaApoyo = req.params.id;
  console.log(idPersonaApoyo);
  const query = 'Select  Distinct citas.IDCita, citas.IDPaciente, doctores.IDDoctor, doctores.Nombre, doctores.Apellido, citas.Fecha, citas.TipoCita, citas.EstatusCita from doctores, citas where doctores.IDDoctor = citas.IDDoctor and citas.IDPaciente = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.post('/api/paciente/appointments', (req, res) => {
  const nuevaCita = req.body; // Datos de la nueva cita
  console.log(nuevaCita.IDPaciente);

  const query = 'INSERT INTO citas (IDPaciente, IDDoctor, TipoCita, EstatusCita, Fecha) VALUES (?, ?, ?, ?, ?)';
  pool.query(query, [nuevaCita.IDPaciente, nuevaCita.IDDoctor, nuevaCita.TipoCita, nuevaCita.EstatusCita, nuevaCita.Fecha], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Error al insertar la cita' });
    }
    // Enviar una respuesta con el ID de la cita insertada
    res.json({ message: 'Cita insertada con éxito', insertedId: results.insertId });
  });
});

app.delete('/api/paciente/appointments/:id', (req, res) => {
  const idCita = req.params.id;

  const query = 'DELETE FROM citas WHERE IDCita = ?';
  pool.query(query, [idCita], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Error al eliminar la cita' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json({ message: 'Cita eliminada con éxito', deletedId: idCita });
  });
});
//-----------------------------Chat-------------------------------------------------------------
app.get('/api/paciente/contactos:id', (req, res) => {
  const idPaciente = req.params.id;
  const query = 'SELECT Distinct doctores.IDDoctor, personasapoyo.IDPersonaApoyo, doctores.Nombre as NombreDoctor, doctores.Apellido as ApellidoDoctor, personasapoyo.Nombre as PersonaApoyoNombre, personasapoyo.Apellido as PersonaApoyoApellido FROM pacientes, asignaciones, personasapoyo, doctores WHERE asignaciones.IDDoctor = doctores.IDDoctor AND personasapoyo.IDPersonaApoyo = asignaciones.IDPersonaApoyo AND asignaciones.IDPaciente = ?';
  pool.query(query, [idPaciente], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.get('/api/paciente/user:id', (req, res) => {
  const idPersonaApoyo = req.params.id;
  const query = 'SELECT Nombre from pacientes where IDPaciente = ?';
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//-----------------------------ServiciosExtra-------------------------------------------------------------

app.get('/api/paciente/ServiciosExtra', (req, res) => {
  const query = 'SELECT * from serviciosextra, empresasterceras where serviciosextra.IDEmpresaTercera = empresasterceras.idEmpresaTercera';
  pool.query(query, (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//----------------------------Seguimiendo medico---------------------------------------------------------------
app.get('/api/paciente/Seguimiento:id', (req, res) => {
  const idPersonaApoyo = req.params.id;
  const query = `Select distinct
  pacientes.Nombre as NombrePaciente, doctores.Nombre as NombreDoctor, personasapoyo.Nombre as NombrePersonaApoyo, 
      citas.Fecha as FechaCita, citas.EstatusCita, citas.TipoCita, receta.NombreMedicina, aseguradoras.NombreAseguradora, 
      asignaciones.FechaAsignacion, receta.CantidadDiaria, receta.Indicaciones
    from
      pacientes, doctores, personasapoyo, citas, receta, aseguradoras, asignaciones, polizas
    where
      pacientes.IDPaciente = asignaciones.IDPaciente AND 
      pacientes.IDPaciente = citas.IDPaciente AND 
      asignaciones.IDDoctor = doctores.IDDoctor AND
      asignaciones.IDPersonaApoyo = personasapoyo.IDPersonaApoyo AND
      citas.IDCita = receta.IDCita AND
      asignaciones.IDPoliza = polizas.IDPoliza AND  
      polizas.IDAseguradora = aseguradoras.IDAseguradora AND 
  pacientes.IDPaciente = ?`;
  pool.query(query, [idPersonaApoyo], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//------------------------------------------------Doctor--------------------------------

//-----------------------------Citas-------------------------------------------------------------
app.get('/api/doctor/appointments/:id', (req, res) => {
  const idDoctor = req.params.id;
  console.log(idDoctor);
  const query = 'Select  Distinct citas.IDCita, citas.IDPaciente, doctores.IDDoctor, pacientes.Nombre, pacientes.Apellido, citas.Fecha, citas.TipoCita, citas.EstatusCita from doctores, citas, pacientes where doctores.IDDoctor = citas.IDDoctor AND citas.IDPaciente = pacientes.IDPaciente AND citas.IDDoctor = ?';
  pool.query(query, [idDoctor], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

app.post('/api/doctor/appointments', (req, res) => {
  const nuevaCita = req.body; // Datos de la nueva cita
  console.log(nuevaCita.IDPaciente);

  const query = 'INSERT INTO citas (IDPaciente, IDDoctor, TipoCita, EstatusCita, Fecha) VALUES (?, ?, ?, ?, ?)';
  pool.query(query, [nuevaCita.IDPaciente, nuevaCita.IDDoctor, nuevaCita.TipoCita, nuevaCita.EstatusCita, nuevaCita.Fecha], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Error al insertar la cita' });
    }
    // Enviar una respuesta con el ID de la cita insertada
    res.json({ message: 'Cita insertada con éxito', insertedId: results.insertId });
  });
});

app.delete('/api/doctor/appointments/:id', (req, res) => {
  const idCita = req.params.id;

  const query = 'DELETE FROM citas WHERE IDCita = ?';
  pool.query(query, [idCita], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Error al eliminar la cita' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json({ message: 'Cita eliminada con éxito', deletedId: idCita });
  });
});

//-----------------------------------------------Informacion doctor-----------

app.get('/api/doctor/profile/:id', (req, res) => {
  const idDoctor = req.params.id;
  console.log(idDoctor);
  const query = 'SELECT * from doctores where IDDoctor = ?';
  pool.query(query, [idDoctor], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});

//------------------------------------------------Pacientes---------------------------

app.get('/api/doctor/patients/:id', (req, res) => {
  const idDoctor = req.params.id;
  console.log(idDoctor);
  const query = 'SELECT pacientes.IDPaciente, pacientes.Nombre FROM pacientes, doctores, asignaciones WHERE pacientes.IDPaciente = asignaciones.IDPaciente AND asignaciones.IDDoctor = doctores.IDDoctor AND doctores.IDDoctor = ?';
  pool.query(query, [idDoctor], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});


//----------------------------------------------Seguimiento_Update------------------
app.post('/api/doctor/seguimiento/newReceta', (req, res) => {
  const nuevaCita = req.body; // Datos de la nueva cita
  console.log(nuevaCita.IDPaciente);

  const query = 'INSERT INTO receta (IDCita, IDMedicina, CantidadDiaria, Indicaciones, Diagnostico, NombreMedicina) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(query, [nuevaCita.IDCita, nuevaCita.IDMedicina, nuevaCita.CantidadDiaria, nuevaCita.Indicaciones, nuevaCita.Diagnostico, nuevaCita.NombreMedicina], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Error al insertar la cita' });
    }
    // Enviar una respuesta con el ID de la cita insertada
    res.json({ message: 'Cita insertada con éxito', insertedId: results.insertId });
  });
});

app.get('/api/doctor/medicina/:name', (req, res) => {
  const idDoctor = req.params.name;
  console.log(idDoctor);
  const query = 'SELECT IDMedicina FROM medicinas WHERE medicinas.NombreMedicina = ?';
  pool.query(query, [idDoctor], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ data: results });
  });
});


app.patch('/api/doctor/cita/modificar/:id', async (req, res) => {
  const idCita = req.params.id; // Obtener el ID de la cita de los parámetros de la URL

  try {
    // Actualizar el estatus de la cita en la base de datos
    const query = 'UPDATE citas SET EstatusCita = ? WHERE IDCita = ?';
    const result = await pool.query(query, ['Realizada', idCita]);

    if (result.affectedRows === 0) {
      // No se encontró la cita con ese ID
      return res.status(404).send('Cita no encontrada');
    }

    res.send('Cita actualizada con éxito');
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).send('Error al procesar la solicitud');
  }
});


//----------------------------------------------Chat----------------------------------
app.post('/api/doctor/seguimiento/newReceta', (req, res) => {
  const nuevaCita = req.body; // Datos de la nueva cita
  console.log(nuevaCita.IDPaciente);

  const query = 'INSERT INTO receta (IDCita, IDMedicina, CantidadDiaria, Indicaciones, Diagnostico, NombreMedicina) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(query, [nuevaCita.IDCita, nuevaCita.IDMedicina, nuevaCita.CantidadDiaria, nuevaCita.Indicaciones, nuevaCita.Diagnostico, nuevaCita.NombreMedicina], (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'Error al insertar la cita' });
    }
    // Enviar una respuesta con el ID de la cita insertada
    res.json({ message: 'Cita insertada con éxito', insertedId: results.insertId });
  });
});
//-----------------------------------------------Fin back------------------------------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});
app.get('/:url(*)', (req, res) => {
  let url = req.params.url
  console.log(url)
  res.sendFile(path.join(__dirname, 'public/' + url));
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