import React, { ChangeEventHandler, useState } from "react";
import { UpdateUser } from "../../../../../utils/user";

interface UserDadosPopupProps {
  user: UpdateUser;
  onHandleSaveUser: (updatedUser: UpdateUser) => void;
  onClose: () => void;
}
const UserDadosPopup: React.FC<UserDadosPopupProps> = ({
  user,
  onHandleSaveUser,
  onClose,
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

  const handleSaveUser = async () => {
    const updatedUser = {
      idUsuario: idUsuario,
      nome: nome,
      sobrenome: sobreNome,
      email: email,
      ativo: userActive,
      podeEditar: userPodeEditar,
    };

    onHandleSaveUser(updatedUser);
  };

  return (
    <div id="dados">
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
      <div className="item-popup div-check">
        <label>Ativo:</label>
        <input
          type="checkbox"
          checked={userActive}
          onChange={handleActiveChange}
        />
      </div>
      <div className="item-popup div-check">
        <label>Pode editar usuários:</label>
        <input
          type="checkbox"
          checked={userPodeEditar}
          onChange={handlePodeEditarChange}
        />
      </div>
      <div className="div-botoes">
        <button onClick={handleSaveUser} className="save">
          Save
        </button>
        <button onClick={onClose} className="cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserDadosPopup;
