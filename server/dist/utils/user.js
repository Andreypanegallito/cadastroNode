"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
