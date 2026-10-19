import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, Switch } from 'formik-mui';
import * as Yup from 'yup';
import withRole from 'src/components/HOC/withRole';
// material
import FormControlLabel from '@mui/material/FormControlLabel';
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { singleUserRole, updateUserRole } from '../../../Redux/actions/authActions';
import Loader from 'src/components/Loader';

function EditUserRole(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({});
  const pageState = useSelector((state) => state.auth.items.userrole);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  // Get User Role
  const userRole = props.user.userRole;
  const formData = pageState;

  // Edit Review
  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        setTimeout(() => {
          dispatch(singleUserRole(id));
          setLoading(false);
        }, 2000);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      return type;
    };
  }, []);

  // Validation Schema for From
  const EditUserRoleSchema = Yup.object().shape({
    roleName: Yup.string().required('Role name is required'),
    roleValue: Yup.string().required('Role value is required')
  });

  return (
    <Grid container justifyContent="center">
      <Grid item lg={8} md={8} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3 }}>
          <CardContent>
            {loading ? (
              <Loader />
            ) : (
              <Formik
                enableReinitialize={true}
                initialValues={{
                  id: id,
                  roleName: pageState?.roleName ? pageState?.roleName : '',
                  roleValue: pageState?.roleValue ? pageState?.roleValue : '',
                  status: pageState?.status ? pageState?.status : false
                }}
                validationSchema={EditUserRoleSchema}
                onSubmit={async (values) => {
                  dispatch(updateUserRole(values, navigate));
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  }, 3000);
                }}
              >
                {({ errors, touched, values }) => (
                  <Form autoComplete="off">
                    <Typography variant="h4" gutterBottom>
                      Edit User Role
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
                      <FormLabel id="status">Status</FormLabel>
                      <Grid>
                        <Grid item lg={5} md={5} xs={10} sm={10}>
                          <FormControlLabel
                            control={<Field component={Switch} type="checkbox" name="status" />}
                            label={values.status === true ? 'Active' : 'In-Active'}
                          />
                        </Grid>
                      </Grid>
                    </Stack>
                    <Grid container>
                      <Grid item xs={4} sm={4} md={3} lg={2} mt={3}>
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
                      <Grid item xs={4} sm={4} md={3} lg={2} ml={2} mt={3}>
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
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default withRole(EditUserRole);
