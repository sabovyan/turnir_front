import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { DigitButtonType } from 'src/types/main.types';
import Colors from 'src/styles/colors';

interface Props {
  type: DigitButtonType;
  width: number;
  onIconClick: () => void;
}

const DigitBoardButton = ({ type, width, onIconClick }: Props) => {
  const handleAddIconClick = () => {
    onIconClick();
  };

  return (
    <IconButton
      onClick={handleAddIconClick}
      style={{
        width: width,
        height: width,
        zIndex: 10,
        borderRadius: 0,
        background: Colors.sideColor,
      }}
    >
      {type === DigitButtonType.minus ? (
        <RemoveIcon style={{ fill: 'white' }} />
      ) : (
        <AddIcon style={{ fill: 'white' }} />
      )}
    </IconButton>
  );
};

export default DigitBoardButton;
