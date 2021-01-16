import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import colors from '../../styles/colors';

import './SignFormSwitcher.css';

interface ISignSwitcherProps {
  isSwitched: boolean;
  handleToggle: () => void;
}

const SignFormSwitcher: FC<ISignSwitcherProps> = ({
  isSwitched,
  handleToggle,
}) => {
  return (
    <div className="sign-card__switch">
      {isSwitched
        ? 'Do you have an Account?'
        : ' Do you want to get registered'}

      <Button
        style={{
          color: colors.green,
          margin: '0 0 0 10px',
          padding: 0,
          lineHeight: 0,
        }}
        onClick={handleToggle}
      >
        {isSwitched ? 'login in' : ' sign up'}
      </Button>
    </div>
  );
};

export default SignFormSwitcher;
