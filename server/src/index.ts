import express, { Request, Response } from "express";
import cors from "cors";
import {
  getUserById,
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  resetPasswordUser,
  forgotPasswordUser,
  selfRegister,
  activateUser,
} from "./services/userService";
import { User } from "./utils/user";
import { sendEmailFormContato } from "./services/emailService";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/allUsers", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Erro ao consultar usuário:", error);
    res.status(500).json({ error: "Erro ao consultar usuário" });
  }
});

// Exemplo de rota para consultar dados no banco de dados
app.get("/dados", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.query.idUsuario);
    const user = await getUserById(userId);
    res.json(user);
  } catch (error) {
    console.error("Erro ao consultar usuário:", error);
    res.status(500).json({ error: "Erro ao consultar usuário" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { usernameLogin, passwordLogin } = req.body;
    const retorno = await loginUser(usernameLogin, passwordLogin);
    if (retorno.result !== null) {
      const userName = retorno.result.username;
      const password = retorno.result.password;
      const isAdmin = retorno.result.isAdmin;
      const userCanEdit = retorno.result.podeEditar;
      if (retorno.status === "Ok") {
        // Crie um token
        const token = jwt.sign({ userName, isAdmin, userCanEdit }, JWT_SECRET, {
          expiresIn: "1h",
        });

        // Retorne o token para o usuário
        res.json({ status: "Ok", token: token });
      } else {
        // Retorne um erro
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.json({ status: retorno.status });
    }
  } catch (error) {
    console.log(error);
  }
});

// Exemplo de rota para inserir dados no banco de dados
app.post("/createUser", async (req: Request, res: Response) => {
  try {
    const { nome, sobrenome, username, email, password } = req.body;
    const newUser = new User(nome, sobrenome, username, email, password, true);
    const retorno = await createUser(newUser);
    if (retorno == "Ok") {
      res.json({ status: "Ok", message: "Usuário criado com sucesso" });
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.post("/selfRegister", async (req: Request, res: Response) => {
  try {
    const { nome, sobrenome, username, email, password } = req.body;
    const newUser = new User(nome, sobrenome, username, email, password, false);
    const retorno = await selfRegister(newUser);
    if (retorno == "Ok") {
      res.json({ status: "Ok", message: "Usuário criado com sucesso" });
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Exemplo de rota para inserir dados no banco de dados
app.post("/updateUser", async (req: Request, res: Response) => {
  try {
    const { idUsuario, nome, sobrenome, email, ativo, podeEditar } = req.body;
    const newUpdateUser = new User(
      nome,
      sobrenome,
      undefined,
      email,
      undefined,
      ativo,
      podeEditar,
      idUsuario
    ); //{ name, email, password };
    const retorno = await updateUser(newUpdateUser);
    if (retorno == "Ok") {
      res.json({ status: "Ok", message: "Usuário alterado com sucesso" });
    }
  } catch (error) {
    console.error("Erro ao alterar o usuário:", error);
    res.status(500).json({ error: "Erro ao alterar o usuário" });
  }
});

app.post("/deleteUser", async (req: Request, res: Response) => {
  try {
    const { idUsuario } = req.body;

    const retorno = await deleteUser(idUsuario);
    if (retorno == "Ok") {
      res.json({ status: "Ok", message: "Usuário deletado com sucesso" });
    }
  } catch (error) {
    console.error("Erro ao alterar o usuário:", error);
    res.status(500).json({ error: "Erro ao deletar o usuário" });
  }
});

app.post("/activateUser", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const retorno = await activateUser(token);
    if (retorno === "Ok") {
      res.json({ status: "Ok", message: "Usuário ativado com sucesso" });
    } else if (retorno === "ErrToken") {
      res.json({
        status: "Error",
        message: "Usuário já foi ativado pela primeira vez.",
      });
    } else if (retorno === "ErrTokenExp") {
      res.json({
        status: "Error",
        message: "Token já passou do tempo de validação.",
      });
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao ativar o usuário" });
  }
});

app.post("/resetPassword", async (req: Request, res: Response) => {
  try {
    const { idUsuario, userPassword } = req.body;

    const retorno = await resetPasswordUser(idUsuario, userPassword);

    if (retorno == "Ok") {
      res.json({ status: "Ok", message: "Alterado a senha com sucesso" });
    }
  } catch (error) {
    console.error("Erro ao alterar o usuário:", error);
    res.status(500).json({ error: "Erro ao deletar o usuário" });
  }
});

app.post("/forgotPassword", async (req: Request, res: Response) => {
  try {
    const { usernameEmail, typeResetPass } = req.body;

    const retorno = await forgotPasswordUser(usernameEmail, typeResetPass);

    if (retorno == "Ok") {
      res.json({ status: "Ok", message: "Alterado a senha com sucesso" });
    }
  } catch (error) {
    console.error("Erro ao alterar o usuário:", error);
    res.status(500).json({ error: "Erro ao deletar o usuário" });
  }
});

app.post("/sendEmailFormContato", async (req: Request, res: Response) => {
  try {
    const { nome, email, assunto, mensagem } = req.body;
    const emailProps = {
      nome: nome,
      email: email,
      assunto: assunto,
      mensagem: mensagem,
    };
    const retorno = await sendEmailFormContato(emailProps);
    if (retorno !== undefined && retorno === "Ok") {
      res.json({ status: "Ok", message: "E-mail enviado com sucesso" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao enviar o email" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Servidor da API iniciado na porta", process.env.PORT);
});
