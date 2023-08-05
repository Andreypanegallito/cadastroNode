import React, { useState } from 'react';

import './cadastroUsuario.scss'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
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
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [isConfPasswordVisible, setConfPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.value === "") {
      e.target.classList.add('error');
      // if (e.target.id === "password") {
      //   togglePasswordVisibility("password")
      // } else if (e.target.id === "confpassword") {
      //   togglePasswordVisibility("confpassword")
      // }
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
    const password = document.getElementById("password") as HTMLInputElement;
    const confpassword = document.getElementById("confpassword") as HTMLInputElement;

    if (password.value === confpassword.value) {
      return true
    }
    else {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const retorno = validateInputs();
    const retornoPassword = validatePassword();
    // Aqui você pode fazer o envio dos dados para o servidor ou executar outras ações com os dados do formulário

    if (retorno && retornoPassword) {
      //faz a requisiçao pro back
      try {
        console.log(formData);
        const response = await axios.post('http://localhost:5000/createUser', formData);

        if (response.data.status === 'OK') {
          // Realiza o redirecionamento para outra página
          navigate('/users');
        }
      }
      catch (error) {

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

  const togglePasswordVisibility = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement;

    if (input.type === 'password') {
      input.type = "text"
    }
    else if (input.type === "text") {
      input.type = "password"
    }

    if (id === 'password') {
      setPasswordVisible(!isPasswordVisible);
    } else if (id === 'confpassword') {
      setConfPasswordVisible(!isConfPasswordVisible);
    }
  };

  const activateViewButtonPassword = (id: string) => {
    const button = document.getElementById(id) as HTMLElement;

    button.style.display = "flex";
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
          onChange={handleChange}
          // onFocus={() => { activateViewButtonPassword("viewPassword") }}
          className='senha'
        />
        {/* <button
          type='button'
          className='viewPassword'
          id='viewPassword'
          onClick={() => { togglePasswordVisibility("password") }}>
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button> */}
      </div>
      <div className='itens-form half'>
        <label htmlFor="confpassword">Confirme sua senha:</label>
        <input
          type="password"
          id="confpassword"
          name="confpassword"
          value={formData.confpassword}
          onChange={handleChange}
          // onFocus={() => { activateViewButtonPassword("viewConfPassword") }}
          className='senha'
        />
        {/* <button
          type='button'
          className='viewPassword'
          id='viewConfPassword'
          onClick={() => { togglePasswordVisibility("confpassword") }}>
          {isConfPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button> */}
      </div>
      <button type="button" className='btn-enviar' onClick={handleSubmit}>Enviar</button>
    </form>
  );
};

export default CadastroUsuario;