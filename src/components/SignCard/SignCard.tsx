import React, { FC, useContext } from 'react';

import SignCardLeft from '../SignCardLeft/SignCardLeft';
import SignCardRight from '../SignCardRight/SignCardRight';
import Backdrop from '../common/Backdrop/Backdrop';

import './SignCard.css';
import { signCardDisplayContext } from '../SideBar/SideBar';

interface ISignCard {
  handleClose: () => void;
}

const SignCard: FC<ISignCard> = ({ handleClose }) => {
  const signCardDisplayed = useContext(signCardDisplayContext);
  /* ANCHOR here is any */
  const handleBackdropClick = (e: any) => {
    if (e.target.className === 'MuiBackdrop-root') handleClose();
  };

  return (
    <Backdrop
      open={signCardDisplayed.state}
      onClick={handleBackdropClick}
      zIndex={2}
    >
      <div className="sign-card">
        <SignCardLeft />
        <SignCardRight />
      </div>
    </Backdrop>
  );
};

export default SignCard;
