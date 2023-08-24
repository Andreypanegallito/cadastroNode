import React, { ChangeEventHandler, useState } from "react";
import { UpdateUser, ResetPasswordUser } from "../../../../utils/user";
import Popup from "../../../../components/popup";

interface UserResetPassPopupProps {
  user: ResetPasswordUser;
  onClose: () => void;
  onSave: (updatedUser: ResetPasswordUser) => void;
}
const UserResetPassPopup: React.FC<UserResetPassPopupProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const idUsuario = user.idUsuario;
  const userName = user.username;
  const [userPassword, setUserPassword] = useState(user.password);
  const [userConfPassword, setUserConfPassword] = useState("");

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserPassword(e.target.value);
  };

  const handleConfPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setUserConfPassword(e.target.value);
  };

  const handleSave = async () => {
    const updatedUser = {
      idUsuario: idUsuario,
      username: userName,
      password: userPassword,
    };

    onSave(updatedUser);
  };

  const renderHtmlPopup = () => {
    return (
      <>
        <h2>Resetar senha usuário</h2>
        <div className="item-popup">
          <label>Usuário:</label>
          <input type="text" value={userName} disabled />
        </div>
        <div className="item-popup">
          <label>Senha:</label>
          <input
            type="password"
            value={userPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="item-popup">
          <label>Confirmação de senha:</label>
          <input
            type="password"
            value={userConfPassword}
            onChange={handleConfPasswordChange}
          />
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

export default UserResetPassPopup;
