import React, { useState } from 'react';
// import login from './components';

import './login.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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


  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.value !== "") {
      e.target.classList.remove('error');
    }
    //else {
    //   e.target.classList.remove('error');
    // }


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


  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const retorno = validateInputs();
    // Aqui você pode fazer o envio dos dados para o servidor ou executar outras ações com os dados do formulário
    console.log(retorno);

    if (retorno) {
      //faz a requisiçao pro back
      // Limpa o formulário após o envio
      setFormDataLogin({
        usernameLogin: '',
        passwordLogin: '',
      });

    }
  };

  return (
    <section >
      <div className="titulo">
        <h1>Login</h1>
      </div>
      <div className="container">
        <form id='login'>
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