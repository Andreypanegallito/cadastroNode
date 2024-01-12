"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.forgotPasswordUser = exports.resetPasswordUser = exports.activateUser = exports.deleteUser = exports.updateUser = exports.selfRegister = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../database/db"));
const user_1 = require("../utils/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_1 = require("../utils/password");
const emailService_1 = require("../services/emailService");
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
const selfRegister = (user) => {
    const payload = {
        nome: user.nome,
        usuario: user.username,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    const data_expiracao = (0, user_1.setValidationDateToken)();
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(user.password, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
                return;
            }
            const newUser = {
                ...user,
                password: hashedPassword,
                token,
                data_expiracao,
            };
            db_1.default.query("INSERT INTO usuarios SET ?", newUser, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    const email = (0, emailService_1.sendEmailSelfRegister)(newUser.token, newUser.email, newUser.nome + "" + newUser.sobrenome);
                    resolve("Ok");
                }
            });
        });
    });
};
exports.selfRegister = selfRegister;
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
const activateUser = async (token) => {
    try {
        let idUsuario;
        let tokenDb;
        let data_expiracao;
        const validateToken = new Promise((resolve, reject) => {
            db_1.default.query("SELECT idUsuario, token, data_expiracao FROM usuarios WHERE token = ?", [token], (error, results) => {
                if (error) {
                    reject(error);
                }
                else {
                    const data = results;
                    if (data.length > 0) {
                        resolve(data[0]);
                    }
                    else {
                        resolve(null); // ou rejeitar, dependendo da lógica desejada
                    }
                }
            });
        });
        const data = await validateToken;
        if (data) {
            idUsuario = data.idUsuario;
            tokenDb = data.token; // Usar o valor de token
            data_expiracao = data.data_expiracao; // Usar o valor de data_expiracao
            const tokenExpirado = (0, user_1.verificaExpiracao)(data_expiracao);
            if (tokenDb !== null && tokenExpirado === false) {
                const setUserAtivo = new Promise((resolve, reject) => {
                    db_1.default.query("UPDATE usuarios SET ativo = true, token = null, data_expiracao = null WHERE idUsuario = ?", [idUsuario], (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve("Ok");
                        }
                    });
                });
                const resultado = await setUserAtivo;
                return resultado;
            }
            else {
                return "ErrTokenExp";
            }
        }
        else {
            return "ErrToken";
        }
    }
    catch (error) {
        console.error(error);
        return "ErrToken"; // Retorna "ErrToken" em caso de erro
    }
};
exports.activateUser = activateUser;
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
const forgotPasswordUser = (usernameEmail, typeResetPass) => {
    return new Promise(async (resolve, reject) => {
        let UserForgotPass = new user_1.User();
        let sqlQuery;
        if (typeResetPass === "email") {
            sqlQuery = "select * from usuarios where email = ?";
        }
        else {
            sqlQuery = "select * from usuarios where username = ?";
        }
        const values = [usernameEmail];
        try {
            const results = await new Promise((res, rej) => {
                db_1.default.query(sqlQuery, values, (error, results) => {
                    if (error)
                        rej(error);
                    else
                        res(results);
                });
            });
            const result = results[0];
            if (result !== undefined) {
                UserForgotPass.idUsuario = result.idUsuario;
                UserForgotPass.username = result.username;
                UserForgotPass.email = result.email;
                UserForgotPass.nome = result.nome + " " + result.sobrenome;
            }
        }
        catch (error) {
            reject(error.message);
            return;
        }
        if (UserForgotPass.idUsuario !== undefined) {
            const randonPassword = (0, password_1.generateRandomPassword)(10);
            bcrypt_1.default.hash(randonPassword, 10, async (err, hashedPassword) => {
                if (err) {
                    reject(err);
                    return;
                }
                const sqlQuery = "UPDATE usuarios SET password = ? WHERE idUsuario = ?";
                const values = [hashedPassword, UserForgotPass.idUsuario];
                try {
                    await new Promise((res, rej) => {
                        db_1.default.query(sqlQuery, values, (error, result) => {
                            if (error) {
                                rej(error);
                            }
                            else {
                                res(result);
                                const emailForgot = (0, emailService_1.sendEmailForgotPassUser)(UserForgotPass.username, randonPassword, UserForgotPass.email, UserForgotPass.nome);
                            }
                        });
                    });
                    resolve("Ok");
                }
                catch (error) {
                    reject(error);
                }
            });
        }
        else {
            if (typeResetPass === "email") {
                reject("Usuário não encontrado cadastrado em nossa base de dados. Informe um e-mail cadastrado.");
            }
            else if (typeResetPass === "username") {
                reject("Usuário não encontrado cadastrado em nossa base de dados. Informe um usuário cadastrado.");
            }
        }
    });
};
exports.forgotPasswordUser = forgotPasswordUser;
const loginUser = (userName, password) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM usuarios WHERE username = ?`;
        try {
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
                            podeEditar: result.podeEditar,
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
        }
        catch (_a) { }
    });
};
exports.loginUser = loginUser;
//# sourceMappingURL=userService.js.map