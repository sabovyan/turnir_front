import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import IButton from './CButton.type';
import colors from '../../../styles/colors';

const CButton: FC<IButton> = ({ text, cssStyles, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        background: colors.orange,
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
