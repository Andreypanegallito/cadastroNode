import React, { useState } from "react";
import CadastroUsuario from '../../components/formRegisterUser';

import './cadastro.scss';
import Menu from '../../components/menu';
import { FormData } from "../../utils/user";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_NODE_URL;



const Cadastro = () => {
  const navigate = useNavigate();

  const linksMenu = [
    { url: '/', text: 'Página Inicial' },
    { url: '/users', text: 'Usuários' },
    { url: '/contato', text: 'Contato' },
  ];

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    sobrenome: '',
    username: '',
    email: '',
    password: '',
    confpassword: ''
  });

  const handleSubmit = async () => {
    //faz a requisiçao pro back
    try {
      const response = await axios.post(`${apiUrl}/createUser`, formData);

      if (response.data.status === 'Ok') {
        // Realiza o redirecionamento para outra página
        navigate('/users');
      }
    }
    catch (error) {
      console.error(error);
      alert("Ops... Algo deu errado ao efetuar o cadastro do usuário. Tente novamente");
    }
    // Limpa o formulário após o envio
    setFormData({
      nome: '',
      sobrenome: '',
      username: '',
      email: '',
      password: '',
      confpassword: '',
    });
  };

  return (
    <>
      <Menu links={linksMenu} />
      <section id="sectionCadastroUsuarios">
        <div className="containerCadUsu">
          <div className="titulo">
            <h1>Cadastro de usuário</h1>
          </div>
          <CadastroUsuario formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />        </div>
      </section>
    </>
  )
}
export default Cadastro