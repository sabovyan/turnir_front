import * as Yup from 'yup';

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'your password should contain at least one uppercase letter, one digit and one symbol',
    )
    .required('Please fill in all the fields'),
  newPassword: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'your password should contain at least one uppercase letter, one digit and one symbol',
    )
    .required('Please fill in all the fields'),
  repeatNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords don't match!")
    .required('Please fill in all the fields'),
});

export default changePasswordSchema;
