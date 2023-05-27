import connection from "../database/db";
import { User } from "../utils/user";

export const getUserById = (userId: number) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

export const createUser = (user: User) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO users SET ?", user, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve("Ok");
      }
    });
  });
};

// Outros métodos relacionados a consultas de usuários...
