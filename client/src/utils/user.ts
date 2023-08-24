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
  email?: string;
  ativo?: boolean;
  podeEditar?: boolean;
}
