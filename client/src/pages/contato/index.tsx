import React from "react";

import "./contato.scss";
import FormContato from "./formContato";

const Contato = () => {
  return (
    <section id="contact" className="backColor">
      <div className="container">
        <div className="titulo">
          <h1 className="title has-text-centered">Formulário de Contato</h1>
        </div>
        <div className="divFormContato">
          <FormContato />
        </div>
      </div>
    </section>
  );
};

export default Contato;
