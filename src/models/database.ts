const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  database: "dbcadastro",
  user: "root",
  password: "@Andreyalmp10",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const ExecuteSql = async (sql) => {
  return connection.query(sql);
};

module.exports = ExecuteSql;
