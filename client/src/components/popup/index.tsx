import React, { useState } from 'react';
import { UpdateUser, User } from '../../utils/user';

import './popup.scss'
import axios from 'axios';

interface UserPopup {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: UpdateUser) => void;
}

const UserEditPopup: React.FC<UserPopup> = ({ user, onClose, onSave }) => {
  const [idUsuario, setIdUsuario] = useState(user.idUsuario);
  const [nome, setNome] = useState(user.nome);
  const [sobreNome, setSobreNome] = useState(user.sobrenome);
  const [email, setEmail] = useState(user.email);
  const [userActive, setUserActive] = useState(user.ativo);

  const handleNameChange = (e: any) => {
    setNome(e.target.value);
  };

  const handleSobreNameChange = (e: any) => {
    setSobreNome(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleActiveChange = (e: any) => {
    setUserActive(e.target.checked);
  };

  const handleSave = async () => {
    alert(userActive);

    const updatedUser = {
      idUsuario: idUsuario,
      nome: nome,
      sobrenome: sobreNome,
      email: email,
      ativo: userActive
    };

    onSave(updatedUser);

    // try {
    //   const response = await axios.post('http://localhost:5000/updateUser', updatedUser);

    //   if (response.data.status === 'Ok') {
    //     // Realiza o redirecionamento para outra página
    //     // navigate('/users');
    //   }
    // }
    // catch (error) {
    //   console.error(error);
    //   alert("Ops... Algo deu errado ao efetuar a alteração do usuário. Tente novamente");
    // }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit User</h2>
        <div className="item-popup">
          <label>Nome:</label>
          <input type="text" value={nome} onChange={handleNameChange} />
        </div>
        <div className="item-popup">
          <label>Sobrenome:</label>
          <input type="text" value={sobreNome} onChange={handleSobreNameChange} />
        </div>
        <div className="item-popup">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="item-popup div-active">
          <label>Ativo:</label>
          <input type="checkbox" checked={userActive} onChange={handleActiveChange} />
        </div>
        <div className="div-botoes">
          <button onClick={handleSave} className='save'>Save</button>
          <button onClick={onClose} className='cancel'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditPopup;
