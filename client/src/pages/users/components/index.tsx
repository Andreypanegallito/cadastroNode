import React from 'react';
import { User } from '../../../utils/user';

interface UserTable {
  users: User[];
}

function UserTable({ users }: UserTable) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Data de criação</th>
        </tr>
      </thead>
      <tbody>
        {
          users.length > 0 ? (
            users.map(user => (
              <tr key={user.idUsuario}>
                <td>{user.idUsuario}</td>
                <td>{user.nome}</td>
                <td>{user.sobrenome}</td>
                <td>{user.email}</td>
                <td>{user.data_criacao.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr key='1'>
              <td>Não foi encontrado usuários cadastrados</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default UserTable;
