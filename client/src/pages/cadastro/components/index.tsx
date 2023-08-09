import React, { useState } from 'react';

import './cadastroUsuario.scss'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface FormData {
  nome: string;
  sobrenome: string;
  username: string;
  email: string;
  password: string;
  confpassword: string;
}

const CadastroUsuario: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    sobrenome: '',
    username: '',
    email: '',
    password: '',
    confpassword: ''
  });
  const [isPasswordEquals, setPasswordEquals] = useState(false);
  const [isPasswordAltered, setIsPasswordAltered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.value === "") {
      e.target.classList.add('error');
    } else {
      e.target.classList.remove('error');
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let retorno = true;
    const form = document.getElementById("cadastroUsuario") as HTMLFormElement;

    const inputs = form?.querySelectorAll('input');

    inputs?.forEach((input: HTMLInputElement) => {
      if (input.value === "") {
        input.classList.add("error");
      }

      if (input.classList.contains("error")) {
        retorno = false
      }
    })
    return retorno
  };

  const validatePassword = () => {
    setIsPasswordAltered(true);
    const password = document.getElementById("password") as HTMLInputElement;
    const confpassword = document.getElementById("confpassword") as HTMLInputElement;

    setPasswordEquals(password.value === confpassword.value);

    return (password.value === confpassword.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const retorno = validateInputs();
    const retornoPassword = validatePassword();
    // Aqui você pode fazer o envio dos dados para o servidor ou executar outras ações com os dados do formulário

    if (retorno && retornoPassword) {
      //faz a requisiçao pro back
      try {
        const response = await axios.post('http://localhost:5000/createUser', formData);

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
    }
  };

  return (
    <form id='cadastroUsuario'>
      <div className='itens-form half'>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="sobrenome">Sobrenome:</label>
        <input
          type="text"
          id="sobrenome"
          name="sobrenome"
          value={formData.sobrenome}
          onChange={handleChange}
        />
      </div>
      <div className='itens-form'>
        <label htmlFor="username">Usuário:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className='itens-form'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => { handleChange(e); validatePassword() }}
          className={`senha ${isPasswordAltered ? isPasswordEquals ? 'sucess' : 'error' : ''}`}
        />
        {isPasswordAltered ? isPasswordEquals ? <div className='passwordCorrect'>A confirmação de senha confere.</div> : <div className='passwordWrong'>A confirmação de senha não confere.</div> : <></>}
      </div>
      <div className='itens-form half'>
        <label htmlFor="confpassword">Confirme sua senha:</label>
        <input
          type="password"
          id="confpassword"
          name="confpassword"
          value={formData.confpassword}
          onChange={(e) => { handleChange(e); validatePassword() }}
          className='senha'
        />
      </div>
      <button type="button" className='btn-enviar' onClick={handleSubmit}>Cadastrar</button>
    </form>
  );
};

export default CadastroUsuario;