"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../database/db"));
const bcrypt = require("bcrypt");
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db_1.default.query("SELECT idUsuario, nome, sobrenome, username, email, DATE_FORMAT(data_criacao, '%d-%m-%Y %H:%i:%s') as data_criacao, ativo FROM usuarios", (error, results) => {
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
        bcrypt.hash(user.password, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
                return;
            }
            const newUser = { ...user, password: hashedPassword };
            db_1.default.query("INSERT INTO usuarios SET ?", newUser, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve("Ok");
                }
            });
        });
    });
};
exports.createUser = createUser;
const updateUser = (user) => {
    return new Promise((resolve, reject) => {
        db_1.default.query("UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, ativo = ? WHERE idUsuario = ?", [user.nome, user.sobrenome, user.email, user.ativo, user.idUsuario], (error, result) => {
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
const deleteUser = (idUsuario) => {
    return new Promise((resolve, reject) => {
        db_1.default.query("DELETE FROM usuarios WHERE idUsuario = ?", idUsuario, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve("Ok");
            }
        });
    });
};
exports.deleteUser = deleteUser;
const loginUser = (userName, password) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM usuarios WHERE username = ?`;
        db_1.default.query(sql, [userName], async (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                const result = results[0];
                if (!result) {
                    // Usuário não encontrado
                    const status = "userErr";
                    const loginResponse = {
                        result: null,
                        status,
                    };
                    resolve(loginResponse);
                    return;
                }
                const storedHashedPassword = result.password;
                const passwordsMatch = await bcrypt.compare(password, storedHashedPassword);
                if (passwordsMatch) {
                    const status = "Ok";
                    const loginResponse = {
                        result: result,
                        status,
                    };
                    resolve(loginResponse);
                }
                else {
                    // senha errada
                    const status = "passErr";
                    const loginResponse = {
                        result: null,
                        status,
                    };
                    resolve(loginResponse);
                }
            }
        });
    });
};
exports.loginUser = loginUser;
// Outros métodos relacionados a consultas de usuários...
