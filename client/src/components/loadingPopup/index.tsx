import React from "react";

import "./loadingPopup.scss";
import Popup from "../popup";

const LoadingPopup = () => {
  const htmlLoadingPopup = () => {
    return (
      <>
        <div className="loader"></div>
        carregando...
      </>
    );
  };

  return <Popup renderContent={htmlLoadingPopup} />;
};

export default LoadingPopup;
