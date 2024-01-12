import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton";
import BackPopup from "../../components/backPopup";
import styles from './activateUser.module.scss'
import Popup from "../../components/popup";
import { isTokenValid } from "../../utils/token";
import * as rjwt from 'react-jwt';


const ActivateUser = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_NODE_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupInvalidToken, setShowPopupInvalidToken] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const url = new URL(window.location.href);
  let token = url.searchParams.get('token') || 'undefined';

  useEffect(() => {
    setContentName();
    setContentUserName();
  });

  const setContentName = () => {
    if (isTokenValid(token)) {
      const decodedToken: any = rjwt.decodeToken(token);
      const name: string = decodedToken.nome;
      setName(name);
    } else {
      setShowPopupInvalidToken(true);
    }
  };

  const setContentUserName = () => {
    if (isTokenValid(token)) {
      const decodedToken: any = rjwt.decodeToken(token);
      const userName = decodedToken.usuario;
      setUserName(userName);
    } else {
      setShowPopupInvalidToken(true);
    }
  };

  const handleActivateUser = async () => {
    if (token !== undefined && token !== null) {
      try {
        const response = await axios.post(`${apiUrl}/activateUser`, { token });

        if (response.data.status === 'Ok') {
          navigate('/login');
        } else if (response.data.status === 'ErrToken') {
          setPopupContent(response.data.message);
          setShowPopup(true);
        } else if (response.data.status === 'ErrTokenExp') {
          setPopupContent(response.data.message);
          setShowPopup(true);
        }
      }
      catch (error) {
        console.error(error);
        setPopupContent("O token passado não é válido.");
      }
    } else {
      setPopupContent("Não foi passado nenhum token como parâmetro");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const closePopupInvalidToken = () => {
    setShowPopupInvalidToken(false);
    navigate('/login');
  };

  const renderHtmlPopup = () => {
    return (
      <div id={styles.activateUser}>
        <div className={`titulo ${styles.titulo}`}>
          <h1> Ativar usuário </h1>
        </div>
        <div>
          <div>
            <p>Nome: {name}</p>
          </div>
          <div>
            <p>Usuário: {userName}</p>
          </div>
        </div>
        <div className={styles.btnActivateUser}>
          <PrimaryButton textButton={'Ativar usuário'} OnClick={handleActivateUser} />
        </div>
      </div>
    )
  }

  const renderHtmlPopupError = () => {
    return (
      <>
        <div className="message-user">
          <h2>{popupContent}</h2>
        </div>
        <div className="div-botoes">
          <button onClick={closePopup} className="cancel">
            Fechar
          </button>
        </div>
      </>
    );
  }
  const renderHtmlPopupInvalidToken = () => {
    return (
      <>
        <div className=" popup-title">
          <h2>Token Inválido</h2>
        </div>
        <div className="popup-message">
          <p>Favor informar um token válido. Verificar link com o token que foi enviado para o e-mail informado no cadastro.</p>
        </div>
        <div className="div-botoes">
          <button onClick={closePopupInvalidToken} className="cancel">
            Fechar
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <BackPopup renderContent={renderHtmlPopup} />
      {showPopup && <Popup renderContent={renderHtmlPopupError} />}
      {showPopupInvalidToken && <Popup renderContent={renderHtmlPopupInvalidToken} />}
    </>
  );


};
export default ActivateUser;