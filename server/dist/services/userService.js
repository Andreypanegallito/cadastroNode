"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = void 0;
const db_1 = __importDefault(require("../database/db"));
const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db_1.default.query("SELECT * FROM users WHERE id = ?", [userId], (error, results) => {
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
        db_1.default.query("INSERT INTO users SET ?", user, (error, result) => {
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
// Outros métodos relacionados a consultas de usuários...
