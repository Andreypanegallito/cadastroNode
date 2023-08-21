import React, { useState } from "react";
import axios from "axios";
import "./login.scss";
import { BsPersonSquare, BsPersonCircle } from "react-icons/bs";
import { redirect, useNavigate } from "react-router-dom";
import Popup from "../../components/popup";
import Cookies from "js-cookie";

interface FormDataLogin {
  usernameLogin: string;
  passwordLogin: string;
}

const Login = () => {
  const [formDataLogin, setFormDataLogin] = useState<FormDataLogin>({
    usernameLogin: "",
    passwordLogin: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_NODE_URL;

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.value !== "") {
      e.target.classList.remove("error");
    }

    setFormDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let retorno = true;
    const form = document.getElementById("login") as HTMLFormElement;

    const inputs = form?.querySelectorAll("input");

    inputs?.forEach((input: HTMLInputElement) => {
      if (input.value === "") {
        input.classList.add("error");
      }

      if (input.classList.contains("error")) {
        retorno = false;
      }
    });
    return retorno;
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const renderHtmlPopup = () => {
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
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const retorno = validateInputs();

    if (retorno) {
      try {
        const response = await axios.post(`${apiUrl}/login`, formDataLogin);

        if (response.data.status === "OK") {
          // Limpa o formulário após o envio
          setFormDataLogin({
            usernameLogin: "",
            passwordLogin: "",
          });

          const token = response.data.token;
          Cookies.set("jwtToken", token);

          // Realiza o redirecionamento para outra página após meio segundo
          setTimeout(function () {
            navigate('/');
          }, 500);
        } else if (response.data.status === "passErr") {
          setPopupContent("Senha incorreta!");
          setShowPopup(true);
        } else if (response.data.status === "userErr") {
          setPopupContent("Usuário inválido!");
          setShowPopup(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section id="login">
      <div className="container-login">
        <div className="img-login half-login">
          <BsPersonCircle />
        </div>
        <div className="content-login half-login">
          <div className="titulo">
            <h1>Login</h1>
          </div>
          <form id="formLogin">
            <div className="itens-form">
              <label htmlFor="usernameLogin">Usuário:</label>
              <input
                type="text"
                id="usernameLogin"
                name="usernameLogin"
                value={formDataLogin.usernameLogin}
                onChange={handleChangeLogin}
              />
            </div>
            <div className="itens-form">
              <label htmlFor="passwordLogin">Senha:</label>
              <input
                type="password"
                id="passwordLogin"
                name="passwordLogin"
                value={formDataLogin.passwordLogin}
                onChange={handleChangeLogin}
                className="senha"
              />
            </div>
            <button
              type="button"
              className="btn-enviar"
              onClick={handleSubmitLogin}
            >
              Login
            </button>
          </form>
          <div className="esqueceu-senha">
            <button>Esqueceu usuário/senha</button>
          </div>
        </div>
      </div>
      {showPopup && <Popup renderContent={renderHtmlPopup} />}
    </section>
  );
};
export default Login;
