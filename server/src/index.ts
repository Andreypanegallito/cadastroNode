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
} from "./services/userService";
import { User } from "./utils/user";
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
    const userName = retorno.result.username;
    const password = retorno.result.password;
    if (retorno.status === "Ok") {
      // Crie um token
      const token = jwt.sign({ userName }, JWT_SECRET, { expiresIn: "1h" });

      // Retorne o token para o usuário
      res.json({ status: "Ok", token: token });
    } else {
      // Retorne um erro
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {}
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

app.post("/resetePassword", async (req: Request, res: Response) => {
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

app.listen(process.env.PORT, () => {
  console.log("Servidor da API iniciado na porta", process.env.PORT);
});
