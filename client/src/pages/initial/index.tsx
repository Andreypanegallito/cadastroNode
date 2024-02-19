import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./initial.scss";
import Cookies from "js-cookie";

const Initial = () => {
  const navigate = useNavigate();

  const deslogar = () => {
    Cookies.remove("jwtToken");

    navigate("/login");
  };

  return (
    <section id="initial">
      <div className="itens">
        <div className="item">
          <button className="btn-link">
            <Link to="/users">Usuários</Link>
          </button>
        </div>
        <div className="item">
          <button className="btn-link">
            <Link to="/cadastro">Cadastro</Link>
          </button>
        </div>
        <div className="item">
          <button onClick={deslogar} className="btn-link">
            Deslogar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Initial;
