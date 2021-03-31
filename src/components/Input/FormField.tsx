import React from 'react';
import TextField from '@material-ui/core/TextField';
import { StandardTextFieldProps } from '@material-ui/core/TextField';

export interface IFormFieldProps extends StandardTextFieldProps {
  label: string | undefined | null;
}

const FormField = ({ ...props }: StandardTextFieldProps) => {
  return <TextField fullWidth {...props} />;
};

export default FormField;
