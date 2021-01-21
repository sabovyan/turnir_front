import React, { FC, useContext } from 'react';

import SignCardLeft from '../SignCardLeft/SignCardLeft';
import SignCardRight from '../SignCardRight/SignCardRight';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';

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
    <CustomBackdrop
      open={signCardDisplayed.state}
      onClick={handleBackdropClick}
      zIndex={2}
    >
      <div className="sign-card">
        <SignCardLeft />
        <SignCardRight />
      </div>
    </CustomBackdrop>
  );
};

export default SignCard;
