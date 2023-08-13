import React, { useState } from 'react';
import { UpdateUser, User } from '../../utils/user';

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
