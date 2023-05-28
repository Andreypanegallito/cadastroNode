import express, { Request, Response } from "express";
import { getUserById, createUser } from "./services/userService";
import { User } from "./utils/user";

const app = express();
app.use(express.json());

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

// Exemplo de rota para inserir dados no banco de dados
app.post("/criarUser", async (req: Request, res: Response) => {
  try {
    const { name, sobrenome, username, email, password } = req.body;
    const newUser = new User(name, sobrenome, username, email, password); //{ name, email, password };
    const retorno = await createUser(newUser);
    if (retorno == "Ok") {
      res.json({ status: "Ok", message: "Usuário criado com sucesso" });
    }
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.listen(3000, () => {
  console.log("Servidor da API iniciado na porta 3000");
});
