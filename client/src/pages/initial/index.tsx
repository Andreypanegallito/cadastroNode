import React from 'react';
import { Link } from 'react-router-dom'

import './initial.scss'

const Initial = () => {
  return (
    <section id='initial'>
      <div className="itens">
        <div className="item">
          <div className="item-title">
            <Link to="/login" className='btn-link' >Login</Link>
          </div>
        </div>
        <div className="item">
          <div className="item-title">
            <Link to="/users" className='btn-link' >Usuários</Link>
          </div>
        </div>
        <div className="item">
          <div className="item-title">
            <Link to="/cadastro" className='btn-link' >Cadastro</Link>
          </div>
        </div>
      </div>
    </section>
  )
};


export default Initial;