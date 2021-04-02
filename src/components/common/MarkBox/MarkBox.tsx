import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import React from 'react';

interface Props {
  label: string;
  checked: boolean | undefined;
  onChange: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  style: React.CSSProperties | undefined;
}

const MarkBox = ({ label, checked, style, onChange }: Props) => {
  return (
    <FormControlLabel
      control={<Checkbox color="primary" />}
      label={label}
      checked={checked}
      onChange={onChange}
      style={style}
    />
  );
};

export default MarkBox;
