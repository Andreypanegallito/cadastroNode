import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

// banco online
// const connection = mysql.createConnection(process.env.DATABASE_URL);

// localhost
var connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  } else {
    console.log("Conexão estabelecida com o banco de dados.");
  }
});

export default connection;
