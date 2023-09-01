import React from "react";

import "./formContato.scss";

const FormContato = () => {
  return (
    <form id="formContato">
      <div className='itens-form half'>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
        // value={formData.nome}
        // onChange={handleChange}
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="sobrenome">Sobrenome:</label>
        <input
          type="text"
          id="sobrenome"
          name="sobrenome"
        // value={formData.sobrenome}
        // onChange={handleChange}
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
        // value={formData.email}
        // onChange={handleChange}
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="assunto">Assunto:</label>
        <select name="assunto" id="assunto">
          <option>Contato de trabalho</option>
          <option>Sites e sistemas</option>
          <option>Dicas</option>
          <option>Diveros</option>
        </select>
      </div>
      <div className='itens-form'>
        <label htmlFor="mensagem">Mensagem:</label>
        <textarea
          id="mensagem"
          name="mensagem"
          className="textarea"
          placeholder="Deixe sua mensagem"
          maxLength={2000}
        ></textarea>
      </div>
      <button type="submit" className='btn-enviar' >Enviar</button>
    </form>
  );
};

export default FormContato;
