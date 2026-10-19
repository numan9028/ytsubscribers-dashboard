import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, Switch } from 'formik-mui';
import * as Yup from 'yup';
import withRole from 'src/components/HOC/withRole';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import CardContent from '@mui/material/CardContent';
//
import { getSettings, updateSetting } from 'src/Redux/actions/stripeSettingActions';

function EditStripeSetting(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // For User Role
  const userRole = props.user.userRole;
  const [state, setState] = useState({});
  const pageState = useSelector((state) => state.stripeSetting.items);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  // For Edit Blog
  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.settings]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(getSettings());
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
    // For User Role
    const type = userRole == 1 ? null : navigate('/dashboard/app');
    return () => {
      setState({}); // To Avoid Memory Leak
      return type;
    };
  }, []);

  // Validation Schema for From
  const StripeSettingsSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    currency: Yup.string().required('Currency is required'),
    publicKey: Yup.string().required('Public Key is required'),
    secretkey: Yup.string().required('Secret key is required'),
    webhookSecret: Yup.string().required('Webhook Secret key is required'),
  });

  return (
    <Grid container>
      <Grid item lg={8} md={8} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                id: pageState.settings?._id ? pageState.settings?._id : '',
                companyName: pageState.settings?.companyName ? pageState.settings?.companyName : '',
                currency: pageState.settings?.currency ? pageState.settings?.currency : '',
                publicKey: pageState.settings?.publicKey ? pageState.settings?.publicKey : '',
                secretkey: pageState.settings?.secretkey ? pageState.settings?.secretkey : '',
                webhookSecret: pageState.settings?.webhookSecret ? pageState.settings?.webhookSecret : '',
                active: pageState.settings?.active ? pageState.settings?.active : true,
                sandBox: pageState.settings?.sandBox ? pageState.settings?.sandBox : false
              }}
              validationSchema={StripeSettingsSchema}
              onSubmit={async (values) => {
                dispatch(updateSetting(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Edit Stripe Setting
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
                      value={values.currency}
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

                    <FormLabel id="secretkey">Webhook Secret</FormLabel>
                    <Field
                      type="text"
                      id="webhookSecret"
                      name="webhookSecret"
                      className="input-style"
                      placeholder="Enter webhookSecret Secret Key"
                    />
                    {errors.webhookSecret && touched.webhookSecret ? (
                      <div className="error-color">{errors.webhookSecret}</div>
                    ) : null}

                    <Grid>
                      <FormLabel id="sandBox">SandBox</FormLabel>
                      <Grid>
                        <Grid item lg={5} md={5} xs={10} sm={10}>
                          <FormControlLabel
                            control={<Field component={Switch} type="checkbox" name="sandBox" />}
                            label={values.sandBox === true ? 'SandBox' : 'Non-SandBox'}
                          />
                        </Grid>
                      </Grid>
                      <FormLabel id="active">Active</FormLabel>
                      <Grid item lg={5} md={5} xs={10} sm={10}>
                        <FormControlLabel
                          control={<Field component={Switch} type="checkbox" name="active" />}
                          label={values.active === true ? 'Active' : 'In-Active'}
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

export default withRole(EditStripeSetting);