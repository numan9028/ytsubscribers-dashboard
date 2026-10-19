import * as Yup from 'yup';
import { useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import { isAuth } from 'src/Redux/helpers/auth';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------
import { loginAccount } from 'src/Redux/actions/authActions';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password length is too short.').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: initialEmail,
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(loginAccount(values));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      {/* {isAuth() ? <Navigate to="/dashboard/app" /> : null} */}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                {...getFieldProps('remember')}
                onChange={handleRememberMe}
                checked={rememberMe}
              />
            }
            label="Remember me"
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading}>
          Login
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                marginLeft: '10px'
              }}
            />
          )}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
