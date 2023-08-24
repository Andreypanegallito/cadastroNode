import React, { useState } from 'react';
import { UpdateUser, User } from '../../../../utils/user';

import './table.scss'
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import UserPopup from '../userEditPopup';
import UserDeletePopup from '../userDeletePopup';

interface UserTableProps {
  users: User[];
  onUserUpdated: () => void;
}

function UserTable({ users, onUserUpdated }: UserTableProps) {
  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const apiUrl = process.env.REACT_APP_API_NODE_URL;

  const openPopup = (user: User, type: string) => {
    setSelectedUser(user);
    if (type === "edit") {
      setIsPopupEditOpen(true);
    } else {
      setIsPopupDeleteOpen(true);
    }
  };

  const closePopup = () => {
    setSelectedUser(null);
    setIsPopupEditOpen(false);
    setIsPopupDeleteOpen(false);
  };

  const saveUser = async (user: UpdateUser) => {
    try {
      const response = await axios.post(`${apiUrl}/updateUser`, user);

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

  const deleteUser = async (idUser: number) => {
    try {
      alert(idUser);
      const response = await axios.post(`${apiUrl}/deleteUser`, { idUsuario: idUser });

      if (response.data.status === 'Ok') { }
      closePopup();
      onUserUpdated();
    } catch (error) {
      console.error(error);
      alert("Ops... Algo deu errado ao tentar excluir o cadastro de usuário. Tente novamente");
    }
  };

  const renderTableUsers = () => {
    return (
      users.length > 0 ? (
        users.map((user, index) => (
          <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
            <td className="id">{index + 1}</td>
            <td className="name">{user.nome} {user.sobrenome}</td>
            <td className='email'>{user.email}</td>
            <td className='data_criacao'>{user.data_criacao.toLocaleString()}</td>
            <td className='usuario_ativo'>
              <span className={user.ativo ? 'ativo' : 'inativo'}>
                {user.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </td>
            <td className='opcoes'>
              <button type='button' title='Editar usuário' onClick={() => openPopup(user, "edit")}><FaUserEdit /></button>
              <button type='button' title='Excluir usuário' onClick={() => openPopup(user, "delete")}><RiDeleteBin6Line /> </button>
            </td>
          </tr >
        ))
      ) : (
        <tr key='1'>
          <td colSpan={6} className="noUsers">Não foi encontrado usuários cadastrados</td>
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
      {isPopupEditOpen && selectedUser && (
        <UserPopup user={selectedUser} onSave={saveUser} onClose={closePopup} />
      )}
      {isPopupDeleteOpen && selectedUser && (
        <UserDeletePopup user={selectedUser} onSave={deleteUser} onClose={closePopup} />
      )}
    </>
  );
}

export default UserTable;
