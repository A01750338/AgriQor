// Import required modules
const express = require('express');
const mysql = require('mysql');
const util = require('util');

// Set server configuration
const port = 8080;
const ipAddr = '44.221.109.63'; // <--- UPDATE THIS LINE

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  database: 'proyecto',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

// Promisify methods to allow them to be used with async/await
db.connect = util.promisify(db.connect);
db.query = util.promisify(db.query);

// Create an instance of Express
const app = express();

// For every request, log the current date, HTTP method, and resource
app.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Parse JSON request bodies
app.use(express.json());

// Create a new quotation
app.post('/register', async (req, res) => {
  try {

    const {Nombre, Numero, Contrasena,Nacimiento,Genero,Relacion,Ubicacion} = req.body;
  
    console.log(`Datos usuario: ${Nombre} ${Numero} ${Contrasena} ${Nacimiento} ${Genero} ${Relacion} ${Ubicacion} \n`);
    const sqlInsert = 'INSERT INTO usuario (Nombre,Genero,Nacimiento,Ubicacion,Relacion,Numero,Contrasena) VALUES (?,?,?,?,?,?,?)';
    
    const result = await db.query(sqlInsert, [Nombre,Genero,Nacimiento,Ubicacion,Relacion,Numero,Contrasena]);
    // db.query(sqlInsert, [Nombre,Genero,Nacimiento,Ubicacion,Relacion,parseInt(Numero),Contrasena]);
    
    console.log(result)
    
    res.type('text')
      .status(201)
      .send(`Usuario creado con el ID = ${ result.insertId }.\n`);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post('/login', async (req, res) => {
  try {

    const {Nombre, Numero, Contrasena,Nacimiento,Genero,Relacion,Ubicacion} = req.body;
  
    console.log(`Datos usuario: ${Nombre} ${Numero} ${Contrasena} ${Nacimiento} ${Genero} ${Relacion} ${Ubicacion} \n`);
    const sqlInsert = 'INSERT INTO usuario (Nombre,Genero,Nacimiento,Ubicacion,Relacion,Numero,Contrasena) VALUES (?,?,?,?,?,?,?)';
    
    const result = await db.query(sqlInsert, [Nombre,Genero,Nacimiento,Ubicacion,Relacion,parseInt(Numero),Contrasena]);
    // db.query(sqlInsert, [Nombre,Genero,Nacimiento,Ubicacion,Relacion,parseInt(Numero),Contrasena]);
    
    console.log(result)
    
    res.type('text')
      .status(201)
      .send(`Usuario creado con el ID = ${ result.insertId }.\n`);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

// This code should go after all handlers because it is the final
// middleware in the chain. If no other middleware handles the
// request, this middleware will be responsible for returning a
// 404 - Not Found response.
app.use((req, res) => {
  res.type('text')
    .status(404)
    .send('404 - Not Found');
  return;
});

// Start the server by binding and listening for connections
// on the specified port
app.listen(port, () => console.log(
`Express started on http://${ ipAddr }:${ port }
Press Ctrl-C to terminate.`));

// Connect to the database
(async () => {
  try {
    await db.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Unable to connect to the database.');
    throw err;
  }
})();