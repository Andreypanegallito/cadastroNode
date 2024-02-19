"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.DATABASE_URL);
// banco online
// const connection = mysql.createConnection(process.env.DATABASE_URL);
// localhost
var connection = mysql2_1.default.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
});
connection.connect((error) => {
    if (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
    else {
        console.log("Conexão estabelecida com o banco de dados.");
    }
});
// connection.end();
exports.default = connection;
//# sourceMappingURL=db.js.map