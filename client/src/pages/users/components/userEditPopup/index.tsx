import React, { ChangeEventHandler, useState } from "react";
import { UpdateUser, User } from "../../../../utils/user";
import Popup from "../../../../components/popup";

interface UserEditPopupProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: UpdateUser) => void;
}
const UserEditPopup: React.FC<UserEditPopupProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const idUsuario = user.idUsuario;
  const [nome, setNome] = useState(user.nome);
  const [sobreNome, setSobreNome] = useState(user.sobrenome);
  const [email, setEmail] = useState(user.email);
  const [userActive, setUserActive] = useState(user.ativo);
  const [userPodeEditar, setUserPodeEditar] = useState(user.podeEditar);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNome(e.target.value);
  };

  const handleSobreNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSobreNome(e.target.value);
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleActiveChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserActive(e.target.checked);
  };

  const handlePodeEditarChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserPodeEditar(e.target.checked);
  };

  const handleSave = async () => {
    const updatedUser = {
      idUsuario: idUsuario,
      nome: nome,
      sobrenome: sobreNome,
      email: email,
      ativo: userActive,
      podeEditar: userPodeEditar,
    };

    onSave(updatedUser);
  };

  const renderHtmlPopup = () => {
    return (
      <>
        <h2>Editar usuário</h2>
        <div className="item-popup">
          <label>Nome:</label>
          <input type="text" value={nome} onChange={handleNameChange} />
        </div>
        <div className="item-popup">
          <label>Sobrenome:</label>
          <input
            type="text"
            value={sobreNome}
            onChange={handleSobreNameChange}
          />
        </div>
        <div className="item-popup">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="item-popup div-active">
          <label>Ativo:</label>
          <input
            type="checkbox"
            checked={userActive}
            onChange={handleActiveChange}
          />
        </div>
        <div className="item-popup div-active">
          <label>Pode editar usuários:</label>
          <input
            type="checkbox"
            checked={userPodeEditar}
            onChange={handlePodeEditarChange}
          />
        </div>
        <div className="item-popup div-active">
          <button type="button">Resetar senha do usuário</button>
        </div>
        <div className="div-botoes">
          <button onClick={handleSave} className="save">
            Save
          </button>
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
        </div>
      </>
    );
  };

  return <Popup renderContent={renderHtmlPopup} />;
};

export default UserEditPopup;
