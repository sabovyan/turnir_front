import React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';

export interface IFormFieldProps extends StandardTextFieldProps {
  label: string | undefined | null;
}

const FormField = ({ ...props }: StandardTextFieldProps) => {
  return <TextField fullWidth {...props} />;
};

export default FormField;
