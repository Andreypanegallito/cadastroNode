import React from "react";

import "./forgotPassword.scss";
import Popup from "../popup";

const ForgotPasswordPopup = () => {
  const htmlForgotPasswordPopup = () => {
    return (
      <>
        <div className="loader"></div>
        carregando...
      </>
    );
  };

  return <Popup renderContent={htmlForgotPasswordPopup} />;
};

export default ForgotPasswordPopup;
