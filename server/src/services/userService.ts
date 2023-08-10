import { RowDataPacket } from "mysql2";
import connection from "../database/db";
import { User } from "../utils/user";

interface LoginResponse {
  result: RowDataPacket[];
  status: string;
}

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT idUsuario, nome, sobrenome, username, email, DATE_FORMAT(data_criacao, '%d-%m-%Y %H:%i:%s') as data_criacao FROM usuarios",
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
    connection.query("INSERT INTO usuarios SET ?", user, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve("Ok");
      }
    });
  });
};

export const updateUser = (user: User) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE INTO usuarios SET ? where idUsuario = ",
      user,
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
    const sql = `select * from usuarios where username = '${userName}' and password = '${password}'`;

    connection.query(sql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const status = "Ok";
        const loginResponse: LoginResponse = {
          result: result as RowDataPacket[],
          status,
        };
        resolve(loginResponse);
      }
    });
  });
};

// Outros métodos relacionados a consultas de usuários...
