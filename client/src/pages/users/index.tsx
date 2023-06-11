import React, { useEffect, useState } from 'react';

import './users.scss'
import axios from 'axios';
import UserTable from './components/table';

const Users = () => {
  const [users, setUsers] = useState([]);

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
    <section id="users">
      <div className="titulo">
        <h1>Tabela de usuários</h1>
      </div>
      <div className="users">
        <UserTable users={users} />
      </div>
    </section>
  )
};

export default Users;