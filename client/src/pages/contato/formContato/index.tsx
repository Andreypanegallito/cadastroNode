import React from "react";

import "./formContato.scss";

const FormContato = () => {
  return (
    <form>
      <div className="field">
        <label className="label">Nome</label>
        <div className="control">
          <input
            name="nome"
            className="input"
            type="text"
            placeholder="Seu nome"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Email *</label>
        <div className="control">
          <input
            name="email"
            className="input"
            type="email"
            placeholder="Seu email"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Assunto</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select name="assunto">
              <option>Reportar erro</option>
              <option>Anúncios</option>
              <option>Outro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Mensagem *</label>
        <div className="control">
          <textarea
            name="mensagem"
            className="textarea"
            placeholder="Deixe sua mensagem"
            maxLength={2000}
          ></textarea>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link is-medium">Enviar</button>
        </div>
      </div>
    </form>
  );
};

export default FormContato;
