import React, { useEffect, useState } from 'react';

import './users.scss'
import axios from 'axios';
import UserTable from './components/table';
import Menu from '../../components/menu';

const Users = () => {
  const [users, setUsers] = useState([]);

  const linksMenu = [
    { url: '/', text: 'Página Inicial' },
    { url: '/cadastro', text: 'Cadastro' },
    { url: '/contato', text: 'Contato' },
  ];

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/allUsers');
      const data = response.data;

      setUsers(data);
    } catch (erro) {
      console.error(erro);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Menu links={linksMenu} />
      <section id="users">
        <div className="titulo">
          <h1>Tabela de usuários</h1>
        </div>
        <div className="container">
          <UserTable users={users} onUserUpdated={getUsers} />
        </div>
      </section>
    </>
  )
};

export default Users;