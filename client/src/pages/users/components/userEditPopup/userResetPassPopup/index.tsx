import React, { ChangeEventHandler, useState } from "react";
import { UpdateUser } from "../../../../../utils/user";

interface UserResetPassPopupProps {
  user: UpdateUser;
  onHandleResetPassword: (updatedUser: UpdateUser) => void;
  onClose: () => void;
}
const UserResetPassPopup: React.FC<UserResetPassPopupProps> = ({
  user,
  onHandleResetPassword,
  onClose,
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

  const handleResetPassword = async () => {
    const updatedUser = {
      idUsuario: idUsuario,
      userPassword: userPassword
    };

    onHandleResetPassword(updatedUser);
    // onHandleResetPassword('resetPass', updatedUser);

    // onSave(updatedUser);
  };

  return (
    <>
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
        <button onClick={handleResetPassword} className="save">
          Redefinir senha
        </button>
        <button onClick={onClose} className="cancel">
          Cancel
        </button>
      </div>
    </>
  );
};

export default UserResetPassPopup;
