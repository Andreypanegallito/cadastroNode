import React, { useState } from 'react';
import { UpdateUser, User } from '../../../../utils/user';
import Popup from '../../../../components/popup';

interface UserDeletePopupProps {
  user: User;
  onClose: () => void;
  onSave: (idUsuario: number) => void;
}
const UserDeletePopup: React.FC<UserDeletePopupProps> = ({ user, onClose, onSave }) => {
  const idUsuario = user.idUsuario;
  const nome = user.nome;
  const sobreNome = user.sobrenome;

  const handleSave = async () => {
    onSave(idUsuario);
  };

  const renderHtmlPopup = () => {
    return (
      <>
        <h2>Apagar usuário?</h2>
        <div className="item-popup">
          <p>Tem certeza que deseja apagar o usuário {nome} {sobreNome}?</p>
        </div>
        <div className="div-botoes">
          <button onClick={handleSave} className='delete'>Sim, quero apagar!</button>
          <button onClick={onClose} className='cancel'>Cancel</button>
        </div>
      </>
    )
  }

  return (
    <Popup renderContent={renderHtmlPopup} />
  )
};


export default UserDeletePopup;