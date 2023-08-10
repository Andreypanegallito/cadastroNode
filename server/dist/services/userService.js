"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../database/db"));
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db_1.default.query("SELECT idUsuario, nome, sobrenome, username, email, DATE_FORMAT(data_criacao, '%d-%m-%Y %H:%i:%s') as data_criacao FROM usuarios", (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
exports.getAllUsers = getAllUsers;
const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db_1.default.query("SELECT * FROM usuarios WHERE idUsuario = ?", [userId], (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results[0]);
            }
        });
    });
};
exports.getUserById = getUserById;
const createUser = (user) => {
    return new Promise((resolve, reject) => {
        db_1.default.query("INSERT INTO usuarios SET ?", user, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve("Ok");
            }
        });
    });
};
exports.createUser = createUser;
const updateUser = (user) => {
    return new Promise((resolve, reject) => {
        db_1.default.query("INSERT INTO usuarios SET ?", user, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve("Ok");
            }
        });
    });
};
exports.updateUser = updateUser;
const loginUser = (userName, password) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from usuarios where username = '${userName}' and password = '${password}'`;
        db_1.default.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                const status = "Ok";
                const loginResponse = {
                    result: result,
                    status,
                };
                resolve(loginResponse);
            }
        });
    });
};
exports.loginUser = loginUser;
// Outros métodos relacionados a consultas de usuários...
