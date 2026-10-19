import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import withRole from 'src/components/HOC/withRole';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { addRole } from 'src/Redux/actions/authActions';

function CreateUser(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // Get User Role
  const userRole = props.user.userRole;
  const [state, setState] = useState({});

  // To check User Role
  useEffect(() => {
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      return type;
    };
  }, []);

  // Validation Schema for From
  const CreateUserRoleSchema = Yup.object().shape({
    roleName: Yup.string().required('Role name is required'),
    roleValue: Yup.string().required('Role value is required')
  });

  return (
    <Grid container justifyContent="center">
      <Grid item lg={8} md={8} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                roleName: '',
                roleValue: ''
              }}
              validationSchema={CreateUserRoleSchema}
              onSubmit={async (values) => {
                dispatch(addRole(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Create User Role
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="roleName">Role Name</FormLabel>
                    <Field
                      type="text"
                      id="roleName"
                      name="roleName"
                      className="input-style"
                      placeholder="Enter Role Name"
                    />
                    {errors.roleName && touched.roleName ? (
                      <div className="error-color">{errors.roleName}</div>
                    ) : null}
                    <FormLabel id="roleValue">Role Value</FormLabel>
                    <Field
                      name="roleValue"
                      select
                      component={TextField}
                      sx={{ width: '95%' }}
                      label="Select role value"
                    >
                      <MenuItem value="1" label="1" key="1">
                        Admin
                      </MenuItem>
                      <MenuItem value="2" label="2" key="2">
                        SEO
                      </MenuItem>
                      <MenuItem value="3" label="3" key="3">
                        User
                      </MenuItem>
                    </Field>
                    {errors.roleValue && touched.roleValue ? (
                      <div className="error-color">{errors.roleValue}</div>
                    ) : null}
                  </Stack>
                  <Grid container>
                    <Grid item xs={5} sm={5} md={3} lg={2} mt={3}>
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
                    <Grid item xs={5} sm={5} md={3} lg={2} ml={2} mt={3}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/dashboard/user-role"
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