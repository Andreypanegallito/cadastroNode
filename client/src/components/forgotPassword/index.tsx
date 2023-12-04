import React, { useState } from "react";

import "./forgotPassword.scss";
import Popup from "../popup";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_NODE_URL;

interface FormDataResetPass {
  usernameEmail: string;
  typeResetPass: string;
}

const ForgotPasswordPopup = () => {
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
    }
    catch (e: any) {
      console.error(e.message);
    }
  };

  const htmlForgotPasswordPopup = () => {
    return (
      <>
        <div className="forgotPassword">
          <div className="divInput">
            <label htmlFor="userEmail">Informe o seu usuário ou e-mail</label>
            <input type="text" id="userEmail" value={userEmail} onChange={e => validarUserEmail(e.target.value)} />
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
