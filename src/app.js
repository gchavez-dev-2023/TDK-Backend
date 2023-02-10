require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createInitialSetup } = require('./libs/initialSetup');

const app = express();
//Setup inicial
createInitialSetup(); 

console.log('Puerto conexion: ', process.env.PORT);
//definir puerto
app.set('port', process.env.PORT || 3000);

//configurar cors
app.use(cors());

//carpeta publica, servir html
app.use(express.static('public'));

//lectura y parseo del Body
app.use(express.json());
// app.use(express.urlencoded({extends: false}));

//logger peticiones entrantes
app.use(morgan('dev'));

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));

app.use('/api/academias', require('./routes/academias.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/subcategorias', require('./routes/subcategorias.routes'));
app.use('/api/niveles', require('./routes/niveles.routes'));
app.use('/api/clases', require('./routes/clases.routes'));

app.use('/api/suscripciones', require('./routes/suscripciones.routes'));

app.use('/api/busquedas', require('./routes/busquedas.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));

app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;