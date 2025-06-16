import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "12345++",
    port: 3306,
    database: "reclamos",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;


testConnection();
