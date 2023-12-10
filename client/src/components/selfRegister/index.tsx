import React, { useState } from "react";

import "./selfRegister.scss";
import CadastroUsuario from '../../components/formRegisterUser';

import Popup from "../popup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { FormData } from "../../utils/user";
const apiUrl = process.env.REACT_APP_API_NODE_URL;

interface ForgotPassPopupProps {
  onClose: () => void;
}

const SelfRegisterPopup: React.FC<ForgotPassPopupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    sobrenome: '',
    username: '',
    email: '',
    password: '',
    confpassword: ''
  });
  const navigate = useNavigate();


  const handleSubmit = async () => {
    //faz a requisiçao pro back
    try {
      const response = await axios.post(`${apiUrl}/selfRegister`, formData);

      if (response.data.status === 'Ok') {
        // Realiza o redirecionamento para outra página
        navigate('/users');
      }
    }
    catch (error) {
      console.error(error);
      alert("Ops... Algo deu errado ao efetuar o cadastro do usuário. Tente novamente");
    }
    // Limpa o formulário após o envio
    setFormData({
      nome: '',
      sobrenome: '',
      username: '',
      email: '',
      password: '',
      confpassword: '',
    });
  };

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
            <CadastroUsuario formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
          </div>
        </div>
      </>
    );
  };

  return <Popup renderContent={htmlSelfRegisterPopup} />;
};

export default SelfRegisterPopup;
