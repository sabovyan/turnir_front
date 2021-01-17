import React from 'react';
import FormField from './FormField';

const main = {
  title: 'FormElements/Input',
  component: FormField,
};

export default main;

export const Input: React.VFC<{}> = () => <FormField label="user name" />;
export const Error: React.VFC<{}> = () => (
  <FormField label="Error" error={true} />
);
