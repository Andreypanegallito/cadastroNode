import React, { useState } from 'react';

import './cadastroUsuario.scss'

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
      if (input.value == "") {
        input.classList.add("error");
      }

      if (input.classList.contains("error")) {
        retorno = false
      }
    })
    return retorno
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let retorno = validateInputs();
    // Aqui você pode fazer o envio dos dados para o servidor ou executar outras ações com os dados do formulário
    console.log(formData);

    if (retorno) {
      //faz a requisiçao pro back
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
          className='senha'
        />
        <button type="button" onClick={() => { togglePasswordVisibility("password") }}>o</button>
      </div>
      <div className='itens-form half'>
        <label htmlFor="confpassword">Confirme sua senha:</label>
        <input
          type="password"
          id="confpassword"
          name="confpassword"
          value={formData.confpassword}
          onChange={handleChange}
          className='senha'
        />
        <button type="button" onClick={() => { togglePasswordVisibility("confpassword") }}>o</button>
      </div>
      <button type="button" className='btn-enviar' onClick={handleSubmit}>Enviar</button>
    </form>
  );
};

export default CadastroUsuario;