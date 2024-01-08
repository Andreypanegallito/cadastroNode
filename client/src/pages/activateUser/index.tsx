import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton";
import BackPopup from "../../components/backPopup";
import styles from './activateUser.module.scss'
import Popup from "../../components/popup";
import jwt_decode from "jwt-decode";


const ActivateUser = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_NODE_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const url = new URL(window.location.href);
  let token = url.searchParams.get('token') || 'undefined';

  useEffect(() => {
    setContentName();
    setContentUserName();
  }, []);

  const setContentName = () => {
    const decodedToken: any = jwt_decode(token);
    const name: string = decodedToken.nome;
    setName(name);
  };
  const setContentUserName = () => {
    const decodedToken: any = jwt_decode(token);
    const userName: string = decodedToken.usuario;
    setUserName(userName);
  };
  const handleActivateUser = async () => {
    if (token !== undefined && token !== null) {
      try {
        const response = await axios.post(`${apiUrl}/activateUser`, { token });

        if (response.data.status === 'Ok') {
          // Realiza o redirecionamento para outra página
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
  }

  return (
    <>
      <BackPopup renderContent={renderHtmlPopup} />
      {showPopup && <Popup renderContent={renderHtmlPopupError} />}
    </>
  );


};
export default ActivateUser;
