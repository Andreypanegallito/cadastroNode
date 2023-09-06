import React, { ChangeEventHandler, useState } from "react";

import "./formContato.scss";
import { Email } from "../../../utils/email";

interface formContatoProps {
  onSave: (objectEmail: Email) => void;
}

const FormContato: React.FC<formContatoProps> = ({ onSave }) => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("Contato de trabalho");
  const [mensagem, setMensagem] = useState("");

  const handleSave = () => {
    const emailProps = {
      nome: `${nome} ${sobrenome}`,
      email: email,
      assunto: assunto,
      mensagem: mensagem
    };

    onSave(emailProps);
  };

  const handleChangeNome: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNome(e.target.value);
  };
  const handleChangeSobrenome: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSobrenome(e.target.value);
  };
  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeAssunto: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setAssunto(e.target.value);
  };
  const handleChangeMensagem: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMensagem(e.target.value);
  };
  return (
    <form id="formContato">
      <div className='itens-form half'>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={handleChangeNome}
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="sobrenome">Sobrenome:</label>
        <input
          type="text"
          id="sobrenome"
          name="sobrenome"
          value={sobrenome}
          onChange={handleChangeSobrenome}
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>
      <div className='itens-form half'>
        <label htmlFor="assunto">Assunto:</label>
        <select name="assunto" id="assunto" onChange={handleChangeAssunto}>
          <option value={"Contato de trabalho"}>Contato de trabalho</option>
          <option value={"Sites e sistemas"}>Sites e sistemas</option>
          <option value={"Dicas"}>Dicas</option>
          <option value={"Diveros"}>Diveros</option>
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
          value={mensagem}
          onChange={handleChangeMensagem}
        ></textarea>
      </div>
      <button type="button" className='btn-enviar' onClick={handleSave} >Enviar</button>
    </form>
  );
};

export default FormContato;
