import React from 'react';
import CadastroUsuario from './components';

const Cadastro = () => {
  return (
    <section >
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