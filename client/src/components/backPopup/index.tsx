import React from 'react';

import styles from './backPopup.module.scss'

interface PopupProps {
  renderContent: () => JSX.Element;
}

const BackPopup: React.FC<PopupProps> = ({ renderContent }) => {

  return (
    <section id={styles.backPopup}>
      <div className={styles.containerBackPopup}>
        {renderContent()}
      </div>
    </section>
  );
};

export default BackPopup;
