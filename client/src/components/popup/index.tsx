import React, { useState } from 'react';
import { User } from '../../utils/user';

import './popup.scss'

interface UserPopup {
  user: User;
  onClose: () => void;
}

const UserEditPopup: React.FC<UserPopup> = ({ user, onClose }) => {
  const [nome, setNome] = useState(user.nome);
  const [sobreNome, setSobreNome] = useState(user.sobrenome);
  const [email, setEmail] = useState(user.email);

  const handleNameChange = (e: any) => {
    setNome(e.target.value);
  };

  const handleSobreNameChange = (e: any) => {
    setSobreNome(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    const updatedUser = {
      name: nome,
      email: email
    };
    // onSave(updatedUser);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit User</h2>
        <div className="item-popup">
          <label>Name:</label>
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
        <div className="div-botoes">
          <button onClick={handleSave} className='save'>Save</button>
          <button onClick={onClose} className='cancel'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditPopup;
