export class User {
  nome: string;
  sobrenome: string;
  username: string;
  email: string;
  password: string;
  ativo: boolean;

  constructor(
    nome?: string,
    sobrenome?: string,
    username?: string,
    email?: string,
    password?: string,
    ativo?: boolean
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.username = username;
    this.email = email;
    this.password = password;
    this.ativo = ativo;
  }
}
