import React from 'react';
import TextField from '@material-ui/core/TextField';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/core';
import greenTheme from '../../styles/theme';

interface Props extends StandardTextFieldProps {
  label: string | undefined | null;
}

const FormField = ({ label, ...props }: Props) => {
  return (
    <ThemeProvider theme={greenTheme}>
      <TextField
        fullWidth
        label={label}
        style={{ marginBottom: greenTheme.spacing(3) }}
        {...props}
      />
    </ThemeProvider>
  );
};

export default FormField;
