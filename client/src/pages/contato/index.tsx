import React, { useState } from "react";
import axios from "axios";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import "./contato.scss";
import FormContato from "./formContato";
import { Email } from "../../utils/email";
import LoadingPopup from "../../components/loadingPopup";
import Popup from "../../components/popup";
import Menu from "../../components/menu";

const Contato = () => {
  const [isLoadingPopupOpen, setIsLoadingPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shouldClearForm, setShouldClearForm] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const apiUrl = process.env.REACT_APP_API_NODE_URL;

  const linksMenu = [
    { url: '/', text: 'Página Inicial' },
    { url: '/users', text: 'Usuários' },
    { url: '/cadastro', text: 'Cadastro' },
  ];

  const onSubmitForm = async (emailProps: Email) => {
    try {
      setIsLoadingPopupOpen(true);
      const response = await axios.post(`${apiUrl}/sendEmailFormContato`, emailProps);

      if (response.data.status === "Ok") {
        setIsLoadingPopupOpen(false);
        setShouldClearForm(true);

        setPopupContent("E-mail enviado com sucesso!");
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error(error);
      setIsLoadingPopupOpen(false);

      setPopupContent("Ocorreu um erro ao enviar o e-mail, tente novamente.")
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderHtmlPopup = () => {
    return (
      <>
        <div className="item-popup message-user">
          <h2>{popupContent}</h2>
        </div>
        <div className="div-botoes">
          <button onClick={closePopup} className="cancel">
            Fechar
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Menu links={linksMenu} />

      <section id="contact" className="backColor">
        <div className="container">
          <div className="titulo">
            <h1 className="title has-text-centered">Formulário de Contato</h1>
          </div>
          <div className="divFormContato">
            <FormContato onSave={onSubmitForm} shouldClearForm={shouldClearForm} setShouldClearForm={setShouldClearForm} />
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
        {isLoadingPopupOpen && <LoadingPopup />}
        {isPopupOpen && <Popup renderContent={renderHtmlPopup} />}
      </section>
    </>
  );
};

export default Contato;
