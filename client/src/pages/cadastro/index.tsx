import React from 'react';
import CadastroUsuario from './components';

import './cadastro.scss';

const Cadastro = () => {
  return (
    <section id="sectionCadastroUsuarios">
      <div className="titulo">
        <h1>Cadastro de usuário</h1>
      </div>
      <div className="container">
        <CadastroUsuario />
      </div>
    </section>
  )
}
export default Cadastro