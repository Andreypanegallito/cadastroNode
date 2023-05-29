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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode fazer o envio dos dados para o servidor ou executar outras ações com os dados do formulário
    console.log(formData);
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
    <form id='cadastroUsuario' onSubmit={handleSubmit}>
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
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="confpassword">Confirme sua senha:</label>
        <input
          type="password"
          id="confpassword"
          name="confpassword"
          value={formData.confpassword}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className='btn-enviar'>Enviar</button>
    </form>
  );
};

export default CadastroUsuario;