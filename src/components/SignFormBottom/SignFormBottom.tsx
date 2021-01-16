import React, { FC, useState } from 'react';

import FacebookButton from '../Buttons/FacebookButton/FacebookButton';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';
import LineWidthText from '../LineWithText/LineWidthText';
import SignFormSwitcher from '../SignFormSwitcher/SignFormSwitcher';

interface ISignFormBottom {
  isSwitched: boolean;
  handleToggle: () => void;
}

const SignFormBottom: FC<ISignFormBottom> = ({ isSwitched, handleToggle }) => {
  return (
    <div className="sign-right__bottom">
      <SignFormSwitcher isSwitched={isSwitched} handleToggle={handleToggle} />
      <LineWidthText text="OR" />
      <GoogleButton />
      <FacebookButton />
    </div>
  );
};

export default SignFormBottom;
