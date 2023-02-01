const { dbConnection } = require('./database/config');

//Crear el servidor de Express
const app = require('./app');

//Base de datos
dbConnection();

app.listen(app.get('port'));

console.log('server',app.get('port'));