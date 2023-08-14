import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './assets/img/logo.svg';
import './assets/styles/App.css';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Initial from './pages/initial';
import Users from './pages/users';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} Component={Login} />
        <Route path="/cadastro" element={<Cadastro />} />

      </Routes>
    </Router>
  );
}

export default App;
