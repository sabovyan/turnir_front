import React from 'react';
import TextField from '@material-ui/core/TextField';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

interface Props extends StandardTextFieldProps {
  label: string | undefined | null;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[800],
    },
  },
  spacing: [2, 2, 2, 16]
});

const FormField = ({ label, ...props }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField fullWidth {...props} label={label} style={{ marginBottom: theme.spacing(3) }} />
    </ThemeProvider>
  );
};

export default FormField;
