import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primaryButton";
import BackPopup from "../../components/backPopup";


const ActivateUser = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_NODE_URL;

  const handleActivateUser = async () => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');

    try {
      console.log(token);
      const response = await axios.post(`${apiUrl}/activateUser`, { token });

      if (response.data.status === 'Ok') {
        // Realiza o redirecionamento para outra página
        navigate('/login');
      }
    }
    catch (error) {
      console.error(error);
      alert("Ops... Algo deu errado ao efetuar o cadastro do usuário. Tente novamente");
    }
  };

  const renderHtmlPopup = () => {
    return (
      <section id="activateUser">
        <div className="containerActivate">
          <div className="contentActivate">
            <div className="titulo">
              <h1>ActivateUser</h1>
            </div>

            <div className="btnActivateUser">
              <PrimaryButton textButton={'Ativar usuário'} OnClick={handleActivateUser} />
              {/* <button type="button" onClick={handleActivateUser}> Ativar usuário</button> */}
            </div>

          </div>
        </div>
      </section>
    )
  }

  return (
    <BackPopup renderContent={renderHtmlPopup} />
  );
};
export default ActivateUser;
