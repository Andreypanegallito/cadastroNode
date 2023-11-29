import { RowDataPacket } from "mysql2";
import connection from "../database/db";
import { User } from "../utils/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "console";

interface LoginResponse {
  result: RowDataPacket;
  status: string;
  token: string;
}

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT idUsuario, nome, sobrenome, username, email, DATE_FORMAT(data_criacao, '%d-%m-%Y %H:%i:%s') as data_criacao, ativo, podeEditar FROM usuarios",
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
      "UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, ativo = ?, podeEditar = ? WHERE idUsuario = ?",
      [
        user.nome,
        user.sobrenome,
        user.email,
        user.ativo,
        user.podeEditar,
        user.idUsuario,
      ],
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

export const resetPasswordUser = (idUsuario: number, userPassword: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(userPassword, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
        return;
      }

      const sqlQuery = "UPDATE usuarios SET password = ? WHERE idUsuario = ?";
      const values = [hashedPassword, idUsuario];

      connection.query(sqlQuery, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve("Ok");
        }
      });
    });
  });
};

export const forgotPasswordUser = (
  usernameEmail: string,
  typeResetPass: string
) => {
  return new Promise((resolve, reject) => {
    let result;
    let idUsuario;
    if (typeResetPass === "email") {
      const sqlQuery = "select * from usuarios where email = ?";
      const values = [typeResetPass];
      connection.query(sqlQuery, values, (error, results) => {
        if (error) {
        } else {
          result = results[0];
          if (!result) {
            idUsuario = result.idUsuario;
          }
        }
      });
    }

    const randonPassword = generateRandomPassword(10);
    bcrypt.hash(randonPassword, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
        return;
      }

      const sqlQuery = "UPDATE usuarios SET password = ? WHERE idUsuario = ?";
      const values = [hashedPassword, idUsuario];

      connection.query(sqlQuery, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve("Ok");
        }
      });
    });
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
            token: null,
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
          // Senha correta - gera um token JWT
          const payload = {
            userId: result.idUsuario, // Id do usuário ou outro identificador único
            username: result.username,
            isAdmin: result.isAdmin,
            podeEditar: result.podeEditar,
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h", // Tempo de expiração do token (opcional)
          });

          const status = "Ok";
          const loginResponse: LoginResponse = {
            result: result as RowDataPacket,
            status,
            token, // Inclui o token na resposta
          };
          resolve(loginResponse);
        } else {
          // senha errada
          const status = "passErr";
          const loginResponse: LoginResponse = {
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

// Outros métodos relacionados a consultas de usuários...
