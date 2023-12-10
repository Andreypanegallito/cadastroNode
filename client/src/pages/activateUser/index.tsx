import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ActivateUser = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_NODE_URL;

  const handleActivateUser = () => {
    console.log("a")


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
