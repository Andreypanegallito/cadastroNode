import React from "react";

import "./contato.scss";
import FormContato from "./formContato";

const Contato = () => {
  return (
    <section id="contact">
      Contatoa
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <h1 className="title has-text-centered">
              Formulário de Contato - Canal TI
            </h1>

            <FormContato />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
