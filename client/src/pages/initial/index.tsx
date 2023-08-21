import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import './initial.scss'
import Cookies from 'js-cookie';

const Initial = () => {
  const navigate = useNavigate();
  const deslogar = () => {
    Cookies.remove('jwtToken');

    navigate('/login');
  };
  return (
    <section id='initial'>
      <div className="itens">
        <div className="item">
          <div className="item-title">
            <Link to="/login" className='btn-link'>Login</Link>
          </div>
        </div>
        <div className="item">
          <div className="item-title">
            <Link to="/users" className='btn-link'>Usuários</Link>
          </div>
        </div>
        <div className="item">
          <div className="item-title">
            <Link to="/cadastro" className='btn-link'>Cadastro</Link>
          </div>
        </div>
        <div className="item">
          <div className="item-title">
            <Link to="/contato" className='btn-link'>Contato</Link>
          </div>
        </div>
        <div className="item">
          <div className="item-title">
            <button onClick={deslogar}>Deslogar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Initial;
