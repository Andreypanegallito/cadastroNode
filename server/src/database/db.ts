import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  } else {
    console.log("Conexão estabelecida com o banco de dados.");
  }
});

export default connection;
