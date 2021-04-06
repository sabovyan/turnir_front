import React, { FC } from 'react';
import MUIBackdrop, { BackdropProps } from '@material-ui/core/Backdrop';
import colors from '../../../styles/colors';

interface IBackdropProps extends BackdropProps {
  open: boolean;
  zIndex: number;
  cssStyles?: React.CSSProperties | undefined;
}

const Backdrop: FC<IBackdropProps> = ({
  open,
  children,
  cssStyles,
  zIndex,
  ...props
}) => {
  return (
    <MUIBackdrop
      {...props}
      open={open}
      style={{
        zIndex,
        background: colors.backdropColor,
        ...cssStyles,
      }}
    >
      {children}
    </MUIBackdrop>
  );
};

export default Backdrop;
