import React, { FC } from 'react';
import Backdrop, { BackdropProps } from '@material-ui/core/Backdrop';
import colors from '../../styles/colors';

interface IBackdropProps extends BackdropProps {
  open: boolean;
}

const CustomBackdrop: FC<IBackdropProps> = ({ open, children, ...props }) => {
  return (
    <Backdrop
      {...props}
      open={open}
      style={{
        zIndex: 1,
        background: colors.backdropColor,
      }}
    >
      {children}
    </Backdrop>
  );
};

export default CustomBackdrop;
