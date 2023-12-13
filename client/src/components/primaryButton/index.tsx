import React from 'react';
import './primaryButton.scss'

interface PrimaryButtonProps {
  textButton: String;
  OnClick: () => {};
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ textButton, OnClick }) => {
  return (
    <button type='button' onClick={OnClick} className={'buttonPrimary'}>{textButton}</button>
  );
};

export default PrimaryButton;
