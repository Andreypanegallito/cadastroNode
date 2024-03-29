export class Email {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;

  constructor(nome: string, email: string, assunto: string, mensagem: string) {
    this.nome = nome;
    this.email = email;
    this.assunto = assunto;
    this.mensagem = mensagem;
  }
}

export interface ActivateUserData {
  idUsuario: number;
  token: string;
  data_expiracao: Date;
}
