"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "@Andreyalmp10",
    database: "dbcadastro",
});
connection.connect((error) => {
    if (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
    else {
        console.log("Conexão estabelecida com o banco de dados.");
    }
});
exports.default = connection;