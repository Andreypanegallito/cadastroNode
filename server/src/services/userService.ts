import { RowDataPacket } from "mysql2";
import connection from "../database/db";
import { User, setValidationDateToken, verificaExpiracao } from "../utils/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "console";
import { generateRandomPassword } from "../utils/password";
import {
  sendEmailForgotPassUser,
  sendEmailSelfRegister,
} from "../services/emailService";
import { v4 as uuidv4 } from "uuid";
import { ActivateUserData } from "../utils/email";

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

export const selfRegister = (user: User) => {
  const token = uuidv4();
  const expirationDate = setValidationDateToken();

  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
        return;
      }

      const newUser = {
        ...user,
        password: hashedPassword,
        token,
        expirationDate,
      };

      connection.query(
        "INSERT INTO usuarios SET ?",
        newUser,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            const email = sendEmailSelfRegister(
              newUser.token,
              newUser.email,
              newUser.nome + "" + newUser.sobrenome
            );
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

export const activateUser = async (token: string) => {
  let idUsuario: number;
  let tokenDb: string;
  let data_expiracao: Date;

  const validateToken = new Promise<ActivateUserData>((resolve, reject) => {
    connection.query(
      "SELECT idUsuario, token, data_expiracao FROM usuarios WHERE token = ?",
      [token],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const data = results as ActivateUserData[];
          if (data.length > 0) {
            resolve(data[0]);
          } else {
            resolve(null); // ou rejeitar, dependendo da lógica desejada
          }
        }
      }
    );
  });

  validateToken
    .then((data) => {
      if (data) {
        idUsuario = data.idUsuario;
        tokenDb = data.token; // Usar o valor de token
        data_expiracao = data.data_expiracao; // Usar o valor de data_expiracao
      }
    })
    .catch((error) => {
      console.error(error);
      return "ErrToken";
    });

  const tokenExpirado = verificaExpiracao(data_expiracao);
  if (tokenDb !== null && tokenExpirado === false) {
    const setUserAtivo = new Promise((resolve, reject) => {
      connection.query(
        "UPDATE usuarios SET ativo = true, token = null, data_expiracao = null WHERE idUsuario = ?",
        [idUsuario],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve("Ok");
          }
        }
      );
    });

    if ((await setUserAtivo) == "Ok") {
      return setUserAtivo;
    }
  }
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
  return new Promise(async (resolve, reject) => {
    let UserForgotPass: User = new User();
    let sqlQuery: string;
    if (typeResetPass === "email") {
      sqlQuery = "select * from usuarios where email = ?";
    } else {
      sqlQuery = "select * from usuarios where username = ?";
    }
    const values = [usernameEmail];
    try {
      const results = await new Promise((res, rej) => {
        connection.query(sqlQuery, values, (error, results) => {
          if (error) rej(error);
          else res(results);
        });
      });
      const result = results[0];
      if (result !== undefined) {
        UserForgotPass.idUsuario = result.idUsuario;
        UserForgotPass.username = result.username;
        UserForgotPass.email = result.email;
        UserForgotPass.nome = result.nome + " " + result.sobrenome;
      }
    } catch (error) {
      reject(error.message);
      return;
    }

    if (UserForgotPass.idUsuario !== undefined) {
      const randonPassword = generateRandomPassword(10);
      bcrypt.hash(randonPassword, 10, async (err, hashedPassword) => {
        if (err) {
          reject(err);
          return;
        }

        const sqlQuery = "UPDATE usuarios SET password = ? WHERE idUsuario = ?";
        const values = [hashedPassword, UserForgotPass.idUsuario];

        try {
          await new Promise((res, rej) => {
            connection.query(sqlQuery, values, (error, result) => {
              if (error) {
                rej(error);
              } else {
                res(result);
                const emailForgot = sendEmailForgotPassUser(
                  UserForgotPass.username,
                  randonPassword,
                  UserForgotPass.email,
                  UserForgotPass.nome
                );
              }
            });
          });
          resolve("Ok");
        } catch (error) {
          reject(error);
        }
      });
    } else {
      if (typeResetPass === "email") {
        reject(
          "Usuário não encontrado cadastrado em nossa base de dados. Informe um e-mail cadastrado."
        );
      } else if (typeResetPass === "username") {
        reject(
          "Usuário não encontrado cadastrado em nossa base de dados. Informe um usuário cadastrado."
        );
      }
    }
  });
};

export const loginUser = (
  userName: string,
  password: string
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM usuarios WHERE username = ?`;

    try {
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
    } catch {}
  });
};
