import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton";
import BackPopup from "../../components/backPopup";
import styles from './activateUser.module.scss'
import Popup from "../../components/popup";


const ActivateUser = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_NODE_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");



  const handleActivateUser = async () => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');

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
          <h1>ActivateUser</h1>
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
