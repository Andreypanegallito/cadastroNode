export class User {
  idUsuario: number;
  nome: string;
  sobrenome: string;
  username: string;
  email: string;
  password: string;
  ativo: boolean;
  podeEditar: boolean;

  constructor(
    nome?: string,
    sobrenome?: string,
    username?: string,
    email?: string,
    password?: string,
    ativo: boolean = true,
    podeEditar: boolean = false,
    idUsuario?: number
  ) {
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
