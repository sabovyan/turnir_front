import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import FacebookButton from '../Buttons/FacebookButton/FacebookButton';
import GoogleButton from '../Buttons/GoogleButton/GoogleButton';
import LineWidthText from '../LineWithText/LineWidthText';
import SignFormSwitcher from '../SignFormSwitcher/SignFormSwitcher';

interface ISignFormBottom {
  isSwitched: boolean;
  handleToggle: () => void;
}

const SignFormBottom: FC<ISignFormBottom> = ({ isSwitched, handleToggle }) => {
  const { t } = useTranslation();
  return (
    <div className="sign-right__bottom">
      <SignFormSwitcher isSwitched={isSwitched} handleToggle={handleToggle} />
      <LineWidthText text={t('or')} />
      <GoogleButton />
      <FacebookButton />
    </div>
  );
};

export default SignFormBottom;
