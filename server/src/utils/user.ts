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

export const setValidationDateToken = () => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 86400000);
  return expirationDate;
};

export const verificaExpiracao = (dataExpiracao: Date) => {
  const agora = new Date();
  const diferenca = agora.getTime() - dataExpiracao.getTime();
  const horas = diferenca / (1000 * 60 * 60);

  return horas >= 24;
};
