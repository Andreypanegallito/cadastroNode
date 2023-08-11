export class User {
  idUsuario: number;
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
    ativo: boolean = true,
    idUsuario?: number
  ) {
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.username = username;
    this.email = email;
    this.password = password;
    this.ativo = ativo;
  }
}
