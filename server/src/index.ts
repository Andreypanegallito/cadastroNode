import express, { Request, Response } from "express";
import cors from "cors";
import {
  getUserById,
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./services/userService";
import { User } from "./utils/user";

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
    if (retorno.status === "Ok") {
      const user = retorno.result;
      const token = retorno.token;
      res.json({ status: "OK", user, token });
    } else {
      res.json({ status: retorno.status });
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
    const { idUsuario, nome, sobrenome, email, ativo } = req.body;
    const newUpdateUser = new User(
      nome,
      sobrenome,
      undefined,
      email,
      undefined,
      ativo,
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

app.listen(process.env.PORT, () => {
  console.log("Servidor da API iniciado na porta", process.env.PORT);
});
