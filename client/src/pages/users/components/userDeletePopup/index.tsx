import React, { useState } from 'react';
import { UpdateUser, User } from '../../../../utils/user';
import Popup from '../../../../components/popup';

interface UserDeletePopupProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: UpdateUser) => void;
}
const UserDeletePopup: React.FC<UserDeletePopupProps> = ({ user, onClose, onSave }) => {
  const [idUsuario, setIdUsuario] = useState(user.idUsuario);
  const [nome, setNome] = useState(user.nome);
  const [sobreNome, setSobreNome] = useState(user.sobrenome);
  const [email, setEmail] = useState(user.email);
  const [userActive, setUserActive] = useState(user.ativo);



  const handleSave = async () => {
    const updatedUser = {
      idUsuario: idUsuario,
      nome: nome,
      sobrenome: sobreNome,
      email: email,
      ativo: userActive
    };

    onSave(updatedUser);
  };

  const renderHtmlPopup = () => {
    return (
      <>
        <h2>Apagar usuário?</h2>
        <div className="item-popup">
          <p>Tem certeza que deseja apagar o usuário {nome} {sobreNome}?</p>
        </div>
        <div className="div-botoes">
          <button onClick={handleSave} className='save'>Save</button>
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