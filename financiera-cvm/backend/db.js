const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = 3000;
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server);

const cxn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'joalmoso0304',
  database: 'Financiera',
  port: 3306,
});

cxn.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

app.use(express.json());

app.get('/clientas', (req, res) => {
  cxn.query('SELECT * FROM clienta', (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
      return;
    } else {
      res.json(results);
    }
  });
});

app.get('/clientas/:id', (req, res) => {
  const searchId = req.params.id;
  cxn.query('SELECT * FROM clienta WHERE id_cliente = ?', [searchId], (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ error: 'Error al realizar la consulta' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Cliente no encontrado' });
      return;
    }
    res.json(results);
    io.emit('dataUpdate');
  });
});

app.post("/login", (req, res) => { // es post porque estamos enviando datos, no recibiendo
  const { id_coordinador, contrasena } = req.body; // id_coordinador y contrasena son los nombres de los campos en el formulario de login, req.body es el cuerpo de la petición

  const query = "SELECT * FROM coordinadores WHERE id_coordinador = ? AND contrasena = ?"; // ? es un placeholder, se reemplaza por los valores de values
  const values = [id_coordinador, contrasena]; // los valores que se reemplazan en los placeholders de la consulta 

  cxn.query(query, values, (err, results) => { // se ejecuta la consulta
    if (err) { // si hay un error
      console.log("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error al realizar la consulta" }); // se envía un mensaje de error por el status 500 (error del servidor) 
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" }); // si no hay resultados, se envía un mensaje de error por el status 404 (no encontrado)
      return;
    }

    res.json(results); // si no hay errores, se envían los resultados de la consulta
  });
});
function generarIdUnica() {
  const min = 10000;
  const max = 99999;

  let id = Math.floor(Math.random() * (max - min + 1)) + min;

  return new Promise((resolve, reject) => {
    cxn.query("SELECT COUNT(*) AS count FROM coordinadores WHERE id_coordinador = ?", [id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      const count = results[0].count;

      if (count === 0) {
        resolve(id);
      } else {
        generarIdUnica()
          .then((newId) => resolve(newId))
          .catch((error) => reject(error));
      }
    });
  });
}

app.post("/registerCoordinador", async (req, res) => {
  const { contrasena, nombre_coordinador, telefono,correo} = req.body;
  try{
    const id_coordinador = await generarIdUnica();
    const query = "INSERT INTO coordinadores (id_coordinador, contrasena, nombre_coordinador, telefono) VALUES (?, ?, ?, ?)";
    const values = [id_coordinador, contrasena, nombre_coordinador, telefono,correo];
    cxn.query(query, values, (err, results) => {
      if(err){
        console.log("Error al realizar la consulta:", err);
        res.status(500).json({ error: "Error al realizar la consulta" });
        return;
      }
      res.json({ id_coordinador });
    });
  } catch(err){
    console.log("Error al generar id:", err);
    res.status(500).json({ error: "Error al generar id" });
  }
  
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`); // se inicia el servidor en el puerto 3000 y se muestra un mensaje en la consola
});