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

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allUsers');
        console.log(response.data);
        const data = response.data;

        setUsers(data);
      } catch (erro) {
        console.error(erro);
      }
    }

    getUsers();
  }, []);

  return (
    <>
      <Menu links={linksMenu} />
      <section id="users">
        <div className="titulo">
          <h1>Tabela de usuários a</h1>
        </div>
        <div className="container">
          <UserTable users={users} />
        </div>
      </section>
    </>
  )
};

export default Users;