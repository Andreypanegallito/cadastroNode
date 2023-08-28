"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.resetPasswordUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../database/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db_1.default.query("SELECT idUsuario, nome, sobrenome, username, email, DATE_FORMAT(data_criacao, '%d-%m-%Y %H:%i:%s') as data_criacao, ativo, podeEditar FROM usuarios", (error, results) => {
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
        bcrypt_1.default.hash(user.password, 10, (err, hashedPassword) => {
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
        db_1.default.query("UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, ativo = ?, podeEditar = ? WHERE idUsuario = ?", [
            user.nome,
            user.sobrenome,
            user.email,
            user.ativo,
            user.podeEditar,
            user.idUsuario,
        ], (error, result) => {
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
const resetPasswordUser = (idUsuario, userPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(userPassword, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
                return;
            }
            const sqlQuery = "UPDATE usuarios SET password = ? WHERE idUsuario = ?";
            const values = [hashedPassword, idUsuario];
            db_1.default.query(sqlQuery, values, (error, result) => {
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
exports.resetPasswordUser = resetPasswordUser;
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
                        token: null,
                    };
                    resolve(loginResponse);
                    return;
                }
                const storedHashedPassword = result.password;
                const passwordsMatch = await bcrypt_1.default.compare(password, storedHashedPassword);
                if (passwordsMatch) {
                    // Senha correta - gera um token JWT
                    const payload = {
                        userId: result.idUsuario,
                        username: result.username,
                        isAdmin: result.isAdmin,
                        podeEditar: result.podeEditar
                    };
                    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                        expiresIn: "1h", // Tempo de expiração do token (opcional)
                    });
                    const status = "Ok";
                    const loginResponse = {
                        result: result,
                        status,
                        token, // Inclui o token na resposta
                    };
                    resolve(loginResponse);
                }
                else {
                    // senha errada
                    const status = "passErr";
                    const loginResponse = {
                        result: null,
                        status,
                        token: null,
                    };
                    resolve(loginResponse);
                }
            }
        });
    });
};
exports.loginUser = loginUser;
// Outros métodos relacionados a consultas de usuários...
