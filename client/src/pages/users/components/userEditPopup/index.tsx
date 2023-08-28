import React, { useState } from "react";
import { UpdateUser, User } from "../../../../utils/user";
import Popup from "../../../../components/popup";
import UserResetPassPopup from "./userResetPassPopup";
import UserDadosPopup from "./userDadosPopup";

import './userEditPopup.scss';

interface UserEditPopupProps {
  user: User;
  onClose: () => void;
  onSave: (type: string, updatedUser: UpdateUser) => void;
}
const UserEditPopup: React.FC<UserEditPopupProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [divDadosActive, setDivDadosActive] = useState(true);
  const [divSenhaActive, setDivSenhaActive] = useState(false);

  const handleActiveDivDados = () => {
    setDivSenhaActive(false);
    setDivDadosActive(true);
  }
  const handleActiveDivSenha = () => {
    setDivDadosActive(false);
    setDivSenhaActive(true);
  }

  const handleSave = async (user: UpdateUser) => {
    onSave('updateUser', user);
  };

  const handleResetPassword = async (user: UpdateUser) => {
    onSave('resetPass', user);
  };

  const renderHtmlPopup = () => {
    return (
      <>
        <h2>Editar usuário</h2>
        <div className="div-btns-select">
          <div className={`div-btn-select ${divDadosActive === true ? 'active' : ''}`}>
            <button onClick={handleActiveDivDados}>Dados</button>
          </div>
          <div className={`div-btn-select ${divSenhaActive === true ? 'active' : ''}`}>
            <button onClick={handleActiveDivSenha}>Senha</button>
          </div>
        </div >
        {divDadosActive && (
          <UserDadosPopup user={user} onHandleSaveUser={handleSave} onClose={onClose} />
        )
        }

        {
          divSenhaActive && (
            <UserResetPassPopup user={user} onHandleResetPassword={handleResetPassword} onClose={onClose} />
          )
        }
      </>
    );
  };

  return <Popup renderContent={renderHtmlPopup} />;
};

export default UserEditPopup;
