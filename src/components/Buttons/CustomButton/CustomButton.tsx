import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import IButton from './CButton.type';
import { orange } from '@material-ui/core/colors';

const CButton: FC<IButton> = ({ text, cssStyles, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        background: orange[800],
        alignSelf: 'center',
        padding: '10px 2rem',
        ...cssStyles,
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default CButton;
