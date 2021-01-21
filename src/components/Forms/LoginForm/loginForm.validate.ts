import * as Yup from 'yup';

const loginValidateSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email')
    .required('email is required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .required('password is required'),
});

export default loginValidateSchema;
