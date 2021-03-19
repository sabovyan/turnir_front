import React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const BackButton = ({ ...props }: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <ArrowBackIosIcon />
    </IconButton>
  );
};

export default BackButton;
