const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // o el usuario que uses
  password:'12345++', // o la contraseña que uses
    port: 3306, // puerto por defecto de MySQL
  database: 'reclamos',
  connectTimeout: 60000, // tiempo de espera para la conexión en milisegundos
});

connection.connect(err => {
  if (err) {
    return console.error('Error de conexión:', err.message);
  }
  console.log('Conexión exitosa a MySQL');
});
