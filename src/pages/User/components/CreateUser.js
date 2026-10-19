import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { request } from 'src/Redux/helpers/axiosRequest';
import withRole from 'src/components/HOC/withRole';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { addUser } from 'src/Redux/actions/authActions';

function CreateUser(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // To Check User Role
  const userRole = props.user.userRole;
  const [state, setState] = useState({});

  // Get All User Roles
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/users/get-all-roles`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setUserRoles(data.userroles);
        setLoading(false);
      });
    // Check User Role
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      return type;
    };
  }, []);

  // Validation Schema for From
  const CreateUserSchema = Yup.object().shape({
    name: Yup.string().min(5, 'Name should be more than 5 words').required('User Name is required'),
    email: Yup.string().email('Must be a valid email').required('User Email is required'),
    password: Yup.string()
      .min(8, 'Password is too short should be at least 8 characters')
      .required('Password is required'),
    userRole: Yup.string().required('User role is required')
  });

  return (
    <Grid container justifyContent="center">
      <Grid item lg={8} md={8} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: '',
                email: '',
                password: '',
                userRole: ''
              }}
              validationSchema={CreateUserSchema}
              onSubmit={async (values) => {
                const data = {
                  name: values.name ? values.name : '',
                  email: values.email ? values.email : '',
                  password: values.password ? values.password : '',
                  userRole: values.userRole ? values.userRole : ''
                };
                dispatch(addUser(data, navigate, setLoading));
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Create User
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="name">Name</FormLabel>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="input-style"
                      placeholder="Enter User Name"
                    />
                    {errors.name && touched.name ? (
                      <div className="error-color">{errors.name}</div>
                    ) : null}

                    <FormLabel id="email">Email</FormLabel>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className="input-style"
                      placeholder="Enter User Email"
                    />
                    {errors.email && touched.email ? (
                      <div className="error-color">{errors.email}</div>
                    ) : null}
                    <FormLabel id="password">Password</FormLabel>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="input-style"
                      placeholder="Enter Password"
                    />

                    {errors.password && touched.password ? (
                      <div className="error-color">{errors.password}</div>
                    ) : null}
                    <FormLabel id="userRole">Role</FormLabel>
                    <Field
                      name="userRole"
                      select
                      component={TextField}
                      sx={{ width: '95%' }}
                      label="Select Value"
                    >
                      <MenuItem value="">Not Selected</MenuItem>
                      {userRoles?.map((item) => {
                        return (
                          <MenuItem value={item.roleValue} label={item.roleValue} key={item._id}>
                            {item.roleName}
                          </MenuItem>
                        );
                      })}
                    </Field>
                    {errors.userRole && touched.userRole ? (
                      <div className="error-color">{errors.userRole}</div>
                    ) : null}
                  </Stack>
                  <Grid container>
                    <Grid xs={4} sm={4} md={3} lg={2} mt={3}>
                      <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={loading}
                      >
                        Submit
                      </LoadingButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={3} lg={2} ml={2} mt={3}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/dashboard/users"
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default withRole(CreateUser);
