import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Initial from '../../pages/initial';
import Users from '../../pages/users';
import Login from '../../pages/login/index';
import Cadastro from '../../pages/cadastro';
import PrivateRoute from '../privateRoute/';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rotas privadas */}
      <PrivateRoute path="/" element={<Initial />} /> {/* Rota índice */}
      <PrivateRoute path="/users" element={<Users />} />
      <PrivateRoute path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
};

export default AppRoutes;
