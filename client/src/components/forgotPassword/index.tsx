import React, { useState } from "react";

import "./forgotPassword.scss";
import Popup from "../popup";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
const apiUrl = process.env.REACT_APP_API_NODE_URL;

interface ForgotPassPopupProps {
  onClose: () => void;
}

const ForgotPasswordPopup: React.FC<ForgotPassPopupProps> = ({ onClose }) => {
  const [userEmail, setUserEmail] = useState("");
  const [typeResetPass, setTypeResetPass] = useState("");



  const validarUserEmail = (e: string) => {
    setUserEmail(e);
    if (e.indexOf("@") !== -1) {
      setTypeResetPass("email");
    } else {
      setTypeResetPass("usuario");
    }
  };

  const resetPassword = async () => {
    const formDataResetPass = {
      usernameEmail: userEmail,
      typeResetPass: typeResetPass
    }

    try {
      const response = await axios.post(`${apiUrl}/forgotPassword`, formDataResetPass);
      if (response.status === 200 && response.statusText === "OK") {

      }
      console.log(response);
    }
    catch (e: any) {
      console.error(e.message);
    }
  };

  const onClosePopup = () => {
    onClose();
  }

  const htmlForgotPasswordPopup = () => {
    return (
      <>
        <div id="forgotPassword" className="forgotPassword">
          <button onClick={onClosePopup} className="btnClosePopup">
            <AiOutlineClose />
          </button>
          <div className="divInput">
            <label htmlFor="userEmail">Informe o seu usuário ou e-mail</label>
            <input type="text" id="userEmail" value={userEmail} placeholder="Informe o usuário ou e-mail" onChange={e => validarUserEmail(e.target.value)} />
          </div>
          <div className="divBtn">
            <button type="button" onClick={resetPassword}> Resetar senha</button>
          </div>
        </div>
      </>
    );
  };

  return <Popup renderContent={htmlForgotPasswordPopup} />;
};

export default ForgotPasswordPopup;
