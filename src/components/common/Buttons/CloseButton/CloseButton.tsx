import React from 'react';

import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CloseButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
