import React from 'react';
import { User } from '../../../../utils/user';

import './table.scss'
interface UserTable {
  users: User[];
}

function UserTable({ users }: UserTable) {
  return (
    <table id="tableUsers">
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
                <td className="id">{user.idUsuario}</td>
                <td className="name">{user.nome} {user.sobrenome}</td>
                {/* <td >{user.sobrenome}</td> */}
                <td className='email'>{user.email}</td>
                <td className='data_criacao'>{user.data_criacao.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr key='1'>
              <td colSpan={5}>Não foi encontrado usuários cadastrados</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default UserTable;
