"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userService_1 = require("./services/userService");
const user_1 = require("./utils/user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/allUsers", async (req, res) => {
    try {
        const users = await (0, userService_1.getAllUsers)();
        res.json(users);
    }
    catch (error) {
        console.error("Erro ao consultar usuário:", error);
        res.status(500).json({ error: "Erro ao consultar usuário" });
    }
});
// Exemplo de rota para consultar dados no banco de dados
app.get("/dados", async (req, res) => {
    try {
        const userId = parseInt(req.query.idUsuario);
        const user = await (0, userService_1.getUserById)(userId);
        res.json(user);
    }
    catch (error) {
        console.error("Erro ao consultar usuário:", error);
        res.status(500).json({ error: "Erro ao consultar usuário" });
    }
});
app.post("/login", async (req, res) => {
    try {
        const { usernameLogin, passwordLogin } = req.body;
        const retorno = await (0, userService_1.loginUser)(usernameLogin, passwordLogin);
        if (retorno.status === "Ok") {
            const user = retorno.result;
            res.json({ status: "OK", user });
        }
    }
    catch (error) { }
});
// Exemplo de rota para inserir dados no banco de dados
app.post("/createUser", async (req, res) => {
    try {
        const { name, sobrenome, username, email, password } = req.body;
        const newUser = new user_1.User(name, sobrenome, username, email, password); //{ name, email, password };
        const retorno = await (0, userService_1.createUser)(newUser);
        if (retorno == "Ok") {
            res.json({ status: "Ok", message: "Usuário criado com sucesso" });
        }
    }
    catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});
app.listen(5000, () => {
    console.log("Servidor da API iniciado na porta 5000");
});
