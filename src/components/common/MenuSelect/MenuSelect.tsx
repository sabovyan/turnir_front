import { MenuItem, StandardTextFieldProps } from '@material-ui/core';
import React from 'react';
import FormField from 'src/components/Input/FormField';

interface Props extends StandardTextFieldProps {
  list: any[];
}

const MenuSelect = ({ list, ...props }: Props) => {
  return (
    <FormField select {...props}>
      {list.map(({ value, name }) => (
        <MenuItem key={value ? value : name} value={value ? value : name}>
          {name}
        </MenuItem>
      ))}
    </FormField>
  );
};

export default MenuSelect;
