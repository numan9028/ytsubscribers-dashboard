import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, Typography, Button, Grid, FormLabel, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { updateUser, singleUser } from 'src/Redux/actions/authActions';

export default function EditUserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // Get Single User
  const pageState = useSelector((state) => state.auth.items);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.user]);

  // Single User Action - id
  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleUser('625cf49c0e2c8b11cc3f84ec'));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  // Validation Schema for From
  const EidtUserSchema = Yup.object().shape({
    // name: Yup.string().min(5, 'Name should be more than 5 words').required('User Name is required'),
    // email: Yup.string().email('Must be a valid email').required('User Email is required'),
    password: Yup.string()
      .min(8, 'Password is too short should be at least 8 characters')
      .required('Password is required')
  });

  return (
    <Grid container justifyContent="center">
      <Grid item lg={8} md={8} xs={10} sm={10}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                id: pageState.user ? pageState.user._id : '',
                name: pageState.user ? pageState.user.name : '',
                email: pageState.user ? pageState.user.email : '',
                password: ''
              }}
              validationSchema={EidtUserSchema}
              onSubmit={async (values) => {
                const data = {
                  id: values.id ? values.id : '',
                  name: values.name ? values.name : pageState.user?.name,
                  email: values.email ? values.email : '',
                  password: values.password ? values.password : pageState.user.password,
                  userRole: pageState.user?.userRole
                };
                dispatch(updateUser(data));
                setLoading(true);
                setTimeout(() => {
                  navigate('/dashboard/user-profile');
                  setLoading(false);
                }, 2000);
              }}
            >
              {({ errors, touched }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Edit User Password
                  </Typography>
                  <p> (Cannot update User Name & Email)</p>
                  <Stack spacing={1} mt={2}>
                    <Tooltip title="Cannot Update Name">
                      <FormLabel id="name">Name</FormLabel>
                    </Tooltip>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="input-style"
                      placeholder="Enter User Name"
                      disabled
                    />
                    {errors.name && touched.name ? (
                      <div className="error-color">{errors.name}</div>
                    ) : null}
                    <Tooltip title="Cannot Update Email">
                      <FormLabel id="email">Email</FormLabel>
                    </Tooltip>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className="input-style"
                      placeholder="Enter User Email"
                      disabled
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
                  </Stack>
                  <Grid container>
                    <Grid xs={5} sm={5} md={3} lg={2} mt={3}>
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
                    <Grid xs={5} sm={5} md={3} lg={2} ml={2} mt={3}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/dashboard/user-profile"
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
