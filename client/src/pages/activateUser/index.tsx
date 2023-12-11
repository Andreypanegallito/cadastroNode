import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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


  return (
    <section id="login">
      <div className="container-login">
        <div className="content-login half-login">
          <div className="titulo">
            <h1>ActivateUser</h1>
          </div>

          <div className="btnActivateUser">
            <button type="button" onClick={handleActivateUser}> Ativar usuário</button>
          </div>

        </div>
      </div>
    </section>
  );
};
export default ActivateUser;
