import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { addStripeSetting } from 'src/Redux/actions/stripeSettingActions';

export default function AddStripeSetting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // For User Role
  // const userRole = localStorage.getItem('role');
  const [state, setState] = useState({});

  // Validation Schema for From
  const StripeSettingsSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    currency: Yup.string().required('Currency is required'),
    publicKey: Yup.string().required('Public Key is required'),
    secretkey: Yup.string().required('Secret key is required'),
    webhookSecret: Yup.string().required('webhookSecret key is required'),
  });

  // To check User Role
  useEffect(() => {
    // const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      // return type;
    };
  }, []);

  return (
    <Grid container>
      <Grid item lg={8} md={8} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                companyName: '',
                currency: '',
                publicKey: '',
                secretkey: '',
                webhookSecret: '',
              }}
              validationSchema={StripeSettingsSchema}
              onSubmit={async (values) => {
                dispatch(addStripeSetting(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Add Stripe Setting
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="companyName">Company Name</FormLabel>
                    <Field
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="input-style"
                      placeholder="Enter Company Name"
                    />
                    {errors.companyName && touched.companyName ? (
                      <div className="error-color">{errors.companyName}</div>
                    ) : null}

                    <FormLabel id="radios">Currency</FormLabel>
                    <Field
                      name="currency"
                      select
                      component={TextField}
                      sx={{ width: '95%' }}
                      label="Select Value"
                    >
                      <MenuItem value="GBP" label="GBP" key="1">
                        GBP
                      </MenuItem>
                      <MenuItem value="USD" label="USD" key="2">
                        USD
                      </MenuItem>
                    </Field>
                    <FormLabel id="publicKey">Public Key</FormLabel>
                    <Field
                      type="text"
                      id="publicKey"
                      name="publicKey"
                      className="input-style"
                      placeholder="Enter Public Key"
                    />
                    {errors.publicKey && touched.publicKey ? (
                      <div className="error-color">{errors.publicKey}</div>
                    ) : null}
                    <FormLabel id="secretkey">Secret Key</FormLabel>
                    <Field
                      type="text"
                      id="secretkey"
                      name="secretkey"
                      className="input-style"
                      placeholder="Enter Secret Key"
                    />
                    {errors.secretkey && touched.secretkey ? (
                      <div className="error-color">{errors.secretkey}</div>
                    ) : null}
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
                        to="/dashboard/stripe-setting"
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
