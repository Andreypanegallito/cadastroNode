export interface User {
  idUsuario: number;
  nome: string;
  sobrenome: string;
  username: string;
  email: string;
  data_criacao: Date;
  ativo: boolean;
  podeEditar: boolean;
}

export interface UpdateUser {
  idUsuario: number;
  nome?: string;
  sobrenome?: string;
  username?: string;
  email?: string;
  password?: string;
  ativo?: boolean;
  podeEditar?: boolean;
}

export interface ResetPasswordUser {
  idUsuario: number;
  username: string;
  password?: string;
}

export interface FormData {
  nome: string;
  sobrenome: string;
  username: string;
  email: string;
  password: string;
  confpassword: string;
}
