import React from 'react';

import SignCardLeft from '../SignCardLeft/SignCardLeft';
import SignCardRight from '../SignCardRight/SignCardRight';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';

import './SignCard.css';

const SignCard = () => {
  return (
    <CustomBackdrop open={false}>
      <div className="sign-card">
        <SignCardLeft />
        <SignCardRight />
      </div>
    </CustomBackdrop>
  );
};

export default SignCard;
