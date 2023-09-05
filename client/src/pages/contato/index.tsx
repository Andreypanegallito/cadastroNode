import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
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
          <div className="redes-sociais">
            <a
              href="https://www.instagram.com/andrey_panegalli"
              target={"_blank"}
              rel="noreferrer"
              className="instagram"
            >
              <FaInstagram className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/andrey-panegalli-2699811b0"
              target={"_blank"}
              rel="noreferrer"
              className="linkedin"
            >
              <FaLinkedin className="icon" />
            </a>
            <a
              href="https://github.com/Andreypanegallito"
              target={"_blank"}
              rel="noreferrer"
              className="github"
            >
              <FaGithub className="icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
