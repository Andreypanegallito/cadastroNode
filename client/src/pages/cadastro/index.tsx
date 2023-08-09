import React from 'react';
import CadastroUsuario from './components';

import './cadastro.scss';
import Menu from '../../components/menu';


const Cadastro = () => {
  const linksMenu = [
    { url: '/', text: 'Página Inicial' },
    { url: '/users', text: 'Usuários' },
    { url: '/login', text: 'Login' },
    { url: '/contato', text: 'Contato' },
  ];


  return (
    <>
      <Menu links={linksMenu} />
      <section id="sectionCadastroUsuarios">
        <div className="containerCadUsu">
          <div className="titulo">
            <h1>Cadastro de usuário</h1>
          </div>
          <CadastroUsuario />
        </div>
      </section>
    </>
  )
}
export default Cadastro