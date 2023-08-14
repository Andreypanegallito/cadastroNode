import React from 'react';

import './popup.scss'

interface PopupProps {
  renderContent: () => JSX.Element;
}

const Popup: React.FC<PopupProps> = ({ renderContent }) => {

  return (
    <div className="popup">
      <div className="popup-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Popup;
