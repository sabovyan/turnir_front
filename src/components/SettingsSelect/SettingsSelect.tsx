import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import FormField, { IFormFieldProps } from '../Input/FormField';
import MenuItem from '@material-ui/core/MenuItem';

interface ISettingsSelectProps extends IFormFieldProps {
  label: string;
  array: string[];
  value: string;
  type: string;
}

const SettingsSelect = ({
  label,
  array,
  value,
  type,
  ...props
}: ISettingsSelectProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        margin: '1rem',
        padding: '5px 10px',
      }}
    >
      <Typography style={{ width: '100%', padding: '5px 0' }}>
        {label}
      </Typography>
      <FormField label="" select value={value} {...props}>
        {array.map((el, idx) =>
          idx === 0 ? (
            <MenuItem key={el} value={el}>
              {`${el} ${type.slice(0, -1)}`}
            </MenuItem>
          ) : (
            <MenuItem key={el} value={el}>
              {`${el} ${type}`}
            </MenuItem>
          ),
        )}
      </FormField>
    </div>
  );
};

export default SettingsSelect;
