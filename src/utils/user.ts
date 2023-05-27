export class User {
  nome: string;
  sobrenome: string;
  username: string;
  email: string;
  password: string;

  constructor(
    nome: string,
    sobrenome: string,
    username: string,
    email: string,
    password: string
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
