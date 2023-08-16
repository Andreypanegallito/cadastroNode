import { RowDataPacket } from "mysql2";
import connection from "../database/db";
import { User } from "../utils/user";
import bcrypt = require("bcrypt");

interface LoginResponse {
  result: RowDataPacket[];
  status: string;
}

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT idUsuario, nome, sobrenome, username, email, DATE_FORMAT(data_criacao, '%d-%m-%Y %H:%i:%s') as data_criacao, ativo FROM usuarios",
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

export const getUserById = (userId: number) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM usuarios WHERE idUsuario = ?",
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
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
        return;
      }

      const newUser = { ...user, password: hashedPassword };

      connection.query(
        "INSERT INTO usuarios SET ?",
        newUser,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve("Ok");
          }
        }
      );
    });
  });
};

export const updateUser = (user: User) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, ativo = ? WHERE idUsuario = ?",
      [user.nome, user.sobrenome, user.email, user.ativo, user.idUsuario],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve("Ok");
        }
      }
    );
  });
};

export const deleteUser = (idUsuario: number) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM usuarios WHERE idUsuario = ?",
      idUsuario,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve("Ok");
        }
      }
    );
  });
};

export const loginUser = (
  userName: string,
  password: string
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM usuarios WHERE username = ?`;

    connection.query(sql, [userName], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        const result = results[0];
        if (!result) {
          // Usuário não encontrado
          const status = "userErr";
          const loginResponse: LoginResponse = {
            result: null,
            status,
          };
          resolve(loginResponse);
          return;
        }

        const storedHashedPassword = result.password;
        const passwordsMatch = await bcrypt.compare(
          password,
          storedHashedPassword
        );

        if (passwordsMatch) {
          const status = "Ok";
          const loginResponse: LoginResponse = {
            result: result as RowDataPacket[],
            status,
          };
          resolve(loginResponse);
        } else {
          // senha errada
          const status = "passErr";
          const loginResponse: LoginResponse = {
            result: null,
            status,
          };
          resolve(loginResponse);
        }
      }
    });
  });
};

// Outros métodos relacionados a consultas de usuários...
