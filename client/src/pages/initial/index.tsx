import React from 'react';
import { Link } from 'react-router-dom'

import './initial.scss'

const Initial = () => {
  return (
    <section id='initial'>
      <div className="itens">
        <div className="item">
          <div className="item-title">
            <button type="button" className="btn-link">
              <Link to="/login" className='btn-link' >Login</Link>
            </button>
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