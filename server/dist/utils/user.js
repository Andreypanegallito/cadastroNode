"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaExpiracao = exports.setValidationDateToken = exports.User = void 0;
class User {
    constructor(nome, sobrenome, username, email, password, ativo = true, podeEditar = false, idUsuario) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.username = username;
        this.email = email;
        this.password = password;
        this.ativo = ativo;
        this.podeEditar = podeEditar;
    }
}
exports.User = User;
const setValidationDateToken = () => {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 86400000);
    const offset = expirationDate.getTimezoneOffset() * 60000; // Convertendo o offset para milissegundos
    const expirationDateFormat = new Date(expirationDate.getTime() - offset)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    return expirationDateFormat;
};
exports.setValidationDateToken = setValidationDateToken;
const verificaExpiracao = (dataExpiracao) => {
    const agora = new Date();
    const diferenca = agora.getTime() - dataExpiracao.getTime();
    const horas = diferenca / (1000 * 60 * 60);
    return horas >= 24;
};
exports.verificaExpiracao = verificaExpiracao;
//# sourceMappingURL=user.js.map