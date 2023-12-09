import React, { useState } from "react";

import "./selfRegister.scss";
import CadastroUsuario from '../../components/formRegisterUser';

import Popup from "../popup";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
const apiUrl = process.env.REACT_APP_API_NODE_URL;

interface ForgotPassPopupProps {
  onClose: () => void;
}

const SelfRegisterPopup: React.FC<ForgotPassPopupProps> = ({ onClose }) => {
  const [userEmail, setUserEmail] = useState("");
  const [typeResetPass, setTypeResetPass] = useState("");



  const onClosePopup = () => {
    onClose();
  }

  const htmlSelfRegisterPopup = () => {
    return (
      <>
        <div id="forgotPassword" className="forgotPassword">
          <button onClick={onClosePopup} className="btnClosePopup">
            <AiOutlineClose />
          </button>
          <div>
            <CadastroUsuario />
          </div>

        </div>
      </>
    );
  };

  return <Popup renderContent={htmlSelfRegisterPopup} />;
};

export default SelfRegisterPopup;
