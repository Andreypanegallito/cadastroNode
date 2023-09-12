import React, { useState } from "react";
import axios from "axios";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import "./contato.scss";
import FormContato from "./formContato";
import { Email } from "../../utils/email";
import LoadingPopup from "../../components/loadingPopup";

const Contato = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_NODE_URL;

  const onSubmitForm = async (emailProps: Email) => {
    console.log(emailProps);

    try {
      setIsPopupOpen(true);
      const response = await axios.post(`${apiUrl}/sendEmailFormContato`, emailProps);

      console.log(response);
      if (response.data.status === "Ok") {
        setIsPopupOpen(false);
      }
    } catch (error) {
      console.error(error);
      setIsPopupOpen(false);

      alert("Não foi possível resetar a senha");
    }
  };

  return (
    <section id="contact" className="backColor">
      <div className="container">
        <div className="titulo">
          <h1 className="title has-text-centered">Formulário de Contato</h1>
        </div>
        <div className="divFormContato">
          <FormContato onSave={onSubmitForm} />
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
      {isPopupOpen && <LoadingPopup />}
    </section>
  );
};

export default Contato;
