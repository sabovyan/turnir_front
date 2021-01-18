import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  displayName: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email')
    .required('email is required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'your password should contain at least one uppercase letter, one digit and one symbol',
    )
    .required('password is required'),
});

export default RegisterSchema;
