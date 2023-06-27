import React, { useState } from 'react';
import axios from 'axios';
import './login.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface FormDataLogin {
  usernameLogin: string;
  passwordLogin: string;
}

const Login = () => {
  const [formDataLogin, setFormDataLogin] = useState<FormDataLogin>({
    usernameLogin: '',
    passwordLogin: '',
  });
  const [isPasswordLoginVisible, setPasswordLoginVisible] = useState(false);
  const navigate = useNavigate();


  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.value !== "") {
      e.target.classList.remove('error');
    }

    setFormDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement;

    if (input.type === 'password') {
      input.type = "text"
    }
    else if (input.type === "text") {
      input.type = "password"
    }

    if (id === 'passwordLogin') {
      setPasswordLoginVisible(!isPasswordLoginVisible);
    }
  };

  const validateInputs = () => {
    let retorno = true;
    const form = document.getElementById("login") as HTMLFormElement;

    const inputs = form?.querySelectorAll('input');

    inputs?.forEach((input: HTMLInputElement) => {
      if (input.value === "") {
        input.classList.add("error");
      }

      if (input.classList.contains("error")) {
        retorno = false
      }
    })
    return retorno
  };

  const activateViewButtonPassword = (id: string) => {
    const button = document.getElementById(id) as HTMLButtonElement;

    button.style.display = "flex";
  };

  const desactivateViewButtonPassword = (id: string) => {
    const button = document.getElementById(id) as HTMLButtonElement;
    const input = document.getElementById("passwordLogin") as HTMLInputElement;
    if (input.value === "") {
      button.style.display = "";
    }
  }

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const retorno = validateInputs();

    if (retorno) {
      //faz a requisiçao pro back-end
      try {
        const response = await axios.post('http://localhost:5000/login', formDataLogin);

        console.log(response);
        console.log(response.data);

        if (response.data.status === 'OK') {
          // Realiza o redirecionamento para outra página
          navigate('/users');
        }
      }
      catch (error) {
        console.error(error);
      }
      // Limpa o formulário após o envio
      setFormDataLogin({
        usernameLogin: '',
        passwordLogin: '',
      });
    }
  };

  return (
    <section id='login'>
      <div className="container">
        <div className="titulo">
          <h1>Login</h1>
        </div>
        <form id='formLogin'>
          <div className='itens-form'>
            <label htmlFor="usernameLogin">Usuário:</label>
            <input
              type="text"
              id="usernameLogin"
              name="usernameLogin"
              value={formDataLogin.usernameLogin}
              onChange={handleChangeLogin}
            />
          </div>
          <div className='itens-form'>
            <label htmlFor="passwordLogin">Senha:</label>
            <input
              type="password"
              id="passwordLogin"
              name="passwordLogin"
              value={formDataLogin.passwordLogin}
              onChange={handleChangeLogin}
              className='senha'
              onFocus={() => { activateViewButtonPassword("viewPasswordLogin") }}
              onBlur={() => { desactivateViewButtonPassword("viewPasswordLogin") }}
            />
            <button
              type='button'
              className='viewPassword'
              id='viewPasswordLogin'
              onClick={() => { togglePasswordVisibility("passwordLogin") }}>
              {isPasswordLoginVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <button type="button" className='btn-enviar' onClick={handleSubmitLogin}>Login</button>
        </form>
      </div>
    </section>
  )
}
export default Login