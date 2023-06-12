import React, { useState } from 'react';
import { User } from '../../utils/user';

import './popup.scss'

interface UserPopup {
  user: User;
}

const UserEditPopup = ({ user }: UserPopup) => {
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);

  const handleNameChange = (e: any) => {
    setNome(e.target.value);
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

  const onCancel = () => { };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit User</h2>
        <label>Name:</label>
        <input type="text" value={nome} onChange={handleNameChange} />
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default UserEditPopup;