
const express = require('express');
const mysql = require('mysql');
const util = require('util');
const crypto = require('crypto');
const session = require('express-session');

const secreto = crypto.randomBytes(32).toString('hex');

const port = 8080;
const ipAddr = '44.221.109.63';


const db = mysql.createConnection({
  host: 'localhost',
  database: 'proyecto',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});


db.connect = util.promisify(db.connect);
db.query = util.promisify(db.query);


const app = express();

app.use(session({
  secret: secreto,
  resave: true,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});


app.use(express.static(__dirname + '/public'));

const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/index.html');
  }
};

app.use(express.json());

// REGISTRO USUARIO
app.post('/register', async (req, res) => {
  try {

    const { Nombre, Numero, Contrasena, Nacimiento, Genero, Relacion, Ubicacion } = req.body;
    const HASH = crypto.createHash('sha256').update(Contrasena).digest('hex');
    console.log(`Datos usuario: ${Nombre} ${Numero} ${HASH} ${Nacimiento} ${Genero} ${Relacion} ${Ubicacion} \n`);



    const sqlInsert = 'INSERT INTO usuario (Nombre,Genero,Nacimiento,Ubicacion,Relacion,Numero,Contrasena) VALUES (?,?,?,?,?,?,?)';
    const result = await db.query(sqlInsert, [Nombre, Genero, Nacimiento, Ubicacion, Relacion, Numero, HASH]);
    console.log(result);

    res.type('text')
      .status(201)
      .send(`Usuario creado con el ID = ${result.insertId}.\n`);
    res.redirect('/index.html');
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN EN JUEGO
app.post('/unity/login', async (req, res) => {
  try {
    const { number, password } = req.body;

    const HASH = crypto.createHash('sha256').update(password).digest('hex');

    console.log(`El usuario de Numero: ${number} y Contraseña : ${password} Se ha logueado exitosamente\n`);
    const sqlInsert = 'SELECT * FROM usuario WHERE Numero = ? AND Contrasena = ?';
    const result = await db.query(sqlInsert, [number, HASH]);

    console.log(result);

    res.type('text')
      .status(201)
      .send(`Datos de usuario = ${result[0].idusuario}.\n`);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USUARIO
app.post('/login', async (req, res) => {
  try {

    const { Numero, Contrasena } = req.body;
    const HASH = crypto.createHash('sha256').update(Contrasena).digest('hex');
    console.log(`Datos usuario: ${Numero} ${HASH}\n`);



    const sqlInsert = 'SELECT * FROM usuario WHERE Numero = ? AND Contrasena = ?';
    const result = await db.query(sqlInsert, [Numero, HASH]);
    console.log(result);


    if (result[0]) {
      req.session.user = {
        id: result[0].id,
        pm: result[0].Admin
      };
      res.type('text')
        .status(201)
        .send(`Usuario loggeado`);
      return;
    } else {
      res.type('text').status(404).send(`Usuario no encontrado`);
    }


    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGOUT USUARIO
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Error al cerrar sesión' });
    } else {
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    }
  });
});

// VISTA ADMIN
app.get('/admin', (req, res) => {
  if (true) {
    res.sendFile('vistaAdmin.html', { root: __dirname + '/public' });
  } else {
    res.redirect('/game');
  }
});

// TOMA ESTADISTICAS ADMIN
app.get('/admin/estadisticas', async (req, res) => {
  if (true) {
    try {
      const sqlSelect = 'SELECT Genero, COUNT(*) AS total from usuario GROUP BY Genero';
      const rows = await db.query(sqlSelect);

      if (rows[0]) {
        let result = [];
        for (let row of rows) {
          result.push({
            genero: row.Genero,
            total: row.total,
          });
        }
        res.json(result);
        console.log(result);

      }
    } catch {
      res.status(404);
    }
  } else {
    res.redirect('/game');
  }
});

// TOMA DE ESTADISTICAS
app.get('/estadisticas', async (req, res) => {
  try {
    const sqlSelect = 'SELECT u.Nombre, e.TotalGanado, e.Prestador, e.Desastres, e.Fortuna FROM estadisticasjuego AS e JOIN usuario AS u ON e.idusuario = u.idusuario ORDER BY e.TotalGanado DESC LIMIT 50';
    const rows = await db.query(sqlSelect);

    if (rows[0]) {
      // console.log('Contiene algo');
      // console.log(rows);
      let result = [];

      for (let row of rows) {
        result.push({
          nombre: row.Nombre,
          ganado: row.TotalGanado,
          prestador: row.Prestador,
          desastres: row.Desastres,
          fortunas: row.Fortuna
        });
      }
      res.json(result);
      return;
    } else {
      // console.log('Vacio');
      res.status(404);
    }

    let result = [];
    for (let row of rows) {
      result.push({
        id: row.id,
        author: row.author,
        prelude: row.excerpt?.split(' ').slice(0, 3).join(' ') + '...',
        url: `http://${ipAddr}:${port}/quotations/${row.id}`
      });
    }
    res.json(result);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

// VISTA DE JUEGO
app.get('/game', requireLogin, (req, res) => {
  res.sendFile('game.html', { root: __dirname + '/public' });
});

app.use((req, res) => {
  res.type('text')
    .status(404)
    .send('404 - Not Found');
  return;
});

app.listen(port, () => console.log(
  `Express started on http://${ipAddr}:${port}
Press Ctrl-C to terminate.`));

(async () => {
  try {
    await db.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Unable to connect to the database.');
    throw err;
  }
})();