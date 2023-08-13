import React, { useState } from 'react';
import { UpdateUser, User } from '../../../../utils/user';

import './table.scss'
import UserEditPopup from '../../../../components/popup';
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface UserTableProps {
  users: User[];
  onUserUpdated: () => void;
}

function UserTable({ users, onUserUpdated }: UserTableProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openPopup = (user: User) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setIsPopupOpen(false);
  };

  const savePopup = async (user: UpdateUser) => {
    try {
      const response = await axios.post('http://localhost:5000/updateUser', user);

      if (response.data.status === 'Ok') {
        closePopup();
        onUserUpdated();
      }
    }
    catch (error) {
      console.error(error);
      alert("Ops... Algo deu errado ao efetuar a alteração do usuário. Tente novamente");
    }
  };

  const renderTableUsers = () => {
    return (
      users.length > 0 ? (
        users.map(user => (
          <tr key={user.idUsuario} className={user.idUsuario % 2 === 0 ? 'even' : 'odd'}>
            <td className="id">{user.idUsuario}</td>
            <td className="name">{user.nome} {user.sobrenome}</td>
            <td className='email'>{user.email}</td>
            <td className='data_criacao'>{user.data_criacao.toLocaleString()}</td>
            <td className='usuario_ativo'>
              <span className={user.ativo ? 'ativo' : 'inativo'}>
                {user.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </td>
            <td className='opcoes'>
              <button onClick={() => openPopup(user)}><FaUserEdit /></button>
              <button><RiDeleteBin6Line /> </button>
            </td>
          </tr >
        ))
      ) : (
        <tr key='1'>
          <td colSpan={5} className="noUsers">Não foi encontrado usuários cadastrados</td>
        </tr>
      )
    )
  };
  return (
    <>
      <table id="tableUsers">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            {/* <th>Sobrenome</th> */}
            <th>Email</th>
            <th>Data de criação</th>
            <th>Ativo</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {renderTableUsers()}
        </tbody>
      </table>
      {isPopupOpen && selectedUser && (
        <UserEditPopup user={selectedUser} onSave={savePopup} onClose={closePopup} />
      )}
    </>
  );
}

export default UserTable;
