import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  } else {
    console.log("Conexão estabelecida com o banco de dados.");
  }
});
// connection.end();

export default connection;
