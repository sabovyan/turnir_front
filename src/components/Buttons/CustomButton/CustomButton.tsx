import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import IButton from './CButton.type';
import { orange } from '@material-ui/core/colors';

const CButton: FC<IButton> = ({ text, ...props }) => {
  return (
    <Button
      fullWidth
      {...props}
      variant="contained"
      color="primary"
      style={{ background: orange[800] }}
    >
      {text}
    </Button>
  );
};

export default CButton;
