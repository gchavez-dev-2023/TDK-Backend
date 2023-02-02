require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

console.log('Puerto conexion: ', process.env.PORT);
//definir puerto
app.set('port', process.env.PORT || 3000);

//configurar cors
app.use(cors());

//lectura y parseo del Body
app.use(express.json());
//app.use(express.urlencoded({extends: false}));

//logger peticiones entrantes
app.use(morgan('dev'));

//Rutas
app.use('/api/employees', require('./routes/employees.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));

module.exports = app;