"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userService_1 = require("./services/userService");
const user_1 = require("./utils/user");
const emailService_1 = require("./services/emailService");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
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
            }
            else {
                // Retorne um erro
                res.status(401).json({ error: "Unauthorized" });
            }
        }
        else {
            res.json({ status: retorno.status });
        }
    }
    catch (error) {
        console.log(error);
    }
});
// Exemplo de rota para inserir dados no banco de dados
app.post("/createUser", async (req, res) => {
    try {
        const { nome, sobrenome, username, email, password } = req.body;
        const newUser = new user_1.User(nome, sobrenome, username, email, password, true);
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
app.post("/selfRegister", async (req, res) => {
    try {
        const { nome, sobrenome, username, email, password } = req.body;
        const newUser = new user_1.User(nome, sobrenome, username, email, password, false);
        const retorno = await (0, userService_1.selfRegister)(newUser);
        if (retorno == "Ok") {
            res.json({ status: "Ok", message: "Usuário criado com sucesso" });
        }
    }
    catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});
// Exemplo de rota para inserir dados no banco de dados
app.post("/updateUser", async (req, res) => {
    try {
        const { idUsuario, nome, sobrenome, email, ativo, podeEditar } = req.body;
        const newUpdateUser = new user_1.User(nome, sobrenome, undefined, email, undefined, ativo, podeEditar, idUsuario); //{ name, email, password };
        const retorno = await (0, userService_1.updateUser)(newUpdateUser);
        if (retorno == "Ok") {
            res.json({ status: "Ok", message: "Usuário alterado com sucesso" });
        }
    }
    catch (error) {
        console.error("Erro ao alterar o usuário:", error);
        res.status(500).json({ error: "Erro ao alterar o usuário" });
    }
});
app.post("/deleteUser", async (req, res) => {
    try {
        const { idUsuario } = req.body;
        const retorno = await (0, userService_1.deleteUser)(idUsuario);
        if (retorno == "Ok") {
            res.json({ status: "Ok", message: "Usuário deletado com sucesso" });
        }
    }
    catch (error) {
        console.error("Erro ao alterar o usuário:", error);
        res.status(500).json({ error: "Erro ao deletar o usuário" });
    }
});
app.post("/activateUser", async (req, res) => {
    try {
        const { token } = req.body;
        const retorno = await (0, userService_1.activateUser)(token);
        if (retorno === "Ok") {
            res.json({ status: "Ok", message: "Usuário ativado com sucesso" });
        }
        else if (retorno === "ErrToken") {
            res.json({
                status: "ErrToken",
                message: "Usuário já foi ativado pela primeira vez.",
            });
        }
        else if (retorno === "ErrTokenExp") {
            res.json({
                status: "ErrTokenExp",
                message: "Token já passou do tempo de validação.",
            });
        }
    }
    catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao ativar o usuário" });
    }
});
app.post("/resetPassword", async (req, res) => {
    try {
        const { idUsuario, userPassword } = req.body;
        const retorno = await (0, userService_1.resetPasswordUser)(idUsuario, userPassword);
        if (retorno == "Ok") {
            res.json({ status: "Ok", message: "Alterado a senha com sucesso" });
        }
    }
    catch (error) {
        console.error("Erro ao alterar o usuário:", error);
        res.status(500).json({ error: "Erro ao deletar o usuário" });
    }
});
app.post("/forgotPassword", async (req, res) => {
    try {
        const { usernameEmail, typeResetPass } = req.body;
        const retorno = await (0, userService_1.forgotPasswordUser)(usernameEmail, typeResetPass);
        if (retorno == "Ok") {
            res.json({ status: "Ok", message: "Alterado a senha com sucesso" });
        }
    }
    catch (error) {
        console.error("Erro ao alterar o usuário:", error);
        res.status(500).json({ error: "Erro ao deletar o usuário" });
    }
});
app.post("/sendEmailFormContato", async (req, res) => {
    try {
        const { nome, email, assunto, mensagem } = req.body;
        const emailProps = {
            nome: nome,
            email: email,
            assunto: assunto,
            mensagem: mensagem,
        };
        const retorno = await (0, emailService_1.sendEmailFormContato)(emailProps);
        if (retorno !== undefined && retorno === "Ok") {
            res.json({ status: "Ok", message: "E-mail enviado com sucesso" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao enviar o email" });
    }
});
app.listen(process.env.PORT, () => {
    console.log("Servidor da API iniciado na porta", process.env.PORT);
});
//# sourceMappingURL=index.js.map