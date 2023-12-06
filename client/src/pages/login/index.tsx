import React, { useState } from "react";
import axios from "axios";
import "./login.scss";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/popup";
import Cookies from "js-cookie";
import LoadingPopup from "../../components/loadingPopup";
import ForgotPasswordPopup from "../../components/forgotPassword";

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
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [isPopupLoadingOpen, setIsPopupLoadingOpen] = useState(false);
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
        setIsPopupLoadingOpen(true);
        const response = await axios.post(`${apiUrl}/login`, formDataLogin);

        if (response.data.status === "Ok") {
          // Limpa o formulário após o envio
          setFormDataLogin({
            usernameLogin: "",
            passwordLogin: "",
          });

          const token = response.data.token;
          Cookies.set("jwtToken", token);
          setIsPopupLoadingOpen(false);

          // Realiza o redirecionamento para outra página
          if (Cookies.get("jwtToken") !== undefined) {
            await navigate("/", { replace: true });
          }
        } else if (response.data.status === "passErr") {
          setIsPopupLoadingOpen(false);
          setPopupContent("Senha incorreta!");
          setShowPopup(true);
        } else if (response.data.status === "userErr") {
          setIsPopupLoadingOpen(false);
          setPopupContent("Usuário inválido!");
          setShowPopup(true);
        }
      } catch (error) {
        setIsPopupLoadingOpen(false);
        console.error(error);
      }
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordPopup(!showForgotPasswordPopup);
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
            <button type="button" onClick={handleForgotPassword}>
              Esqueceu usuário/senha
            </button>
          </div>
        </div>
      </div>
      {showPopup && <Popup renderContent={renderHtmlPopup} />}
      {showForgotPasswordPopup && <ForgotPasswordPopup onClose={handleForgotPassword} />}
      {isPopupLoadingOpen && <LoadingPopup />}
    </section>
  );
};
export default Login;
