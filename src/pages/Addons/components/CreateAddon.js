import { useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
// material
import { Stack, Typography, Button, Grid, FormLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { createAddon } from 'src/Redux/actions/addonsActions';

export default function CreateAddon() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Validation Schema for From
  const AddonSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    quantity: Yup.string().required('Quantity is required'),
    price: Yup.string().required('Price is required'),
    discount: Yup.string().required('Discount is required'),
    serviceId: Yup.string().required('Service Id is required')
  });

  return (
    <Grid container justifyContent="center">
      <Grid lg={8} md={8} xs={10} sm={10}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                title: '',
                quantity: '',
                price: '',
                discount: '',
                serviceId: ''
              }}
              validationSchema={AddonSchema}
              onSubmit={async (values) => {
                // Dispatch Action
                dispatch(createAddon(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Add New Addon
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="title">Addon Title</FormLabel>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="input-style"
                      placeholder="Enter Author Name"
                    />
                    {errors.title && touched.title ? (
                      <div className="error-color">{errors.title}</div>
                    ) : null}
                    <FormLabel id="quantity">Quantity</FormLabel>
                    <Field
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="input-style"
                      placeholder="Enter Quantity (Number)"
                      step="any"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                    />
                    {errors.quantity && touched.quantity ? (
                      <div className="error-color">{errors.quantity}</div>
                    ) : null}
                    <FormLabel id="price">Price</FormLabel>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="input-style"
                      placeholder="Enter price (Number)"
                      step="any"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                    />
                    {errors.price && touched.price ? (
                      <div className="error-color">{errors.price}</div>
                    ) : null}
                    <FormLabel id="discount">Discount</FormLabel>
                    <Field
                      type="number"
                      id="discount"
                      name="discount"
                      className="input-style"
                      placeholder="Enter discount (Number)"
                      step="any"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                    />
                    {errors.discount && touched.discount ? (
                      <div className="error-color">{errors.discount}</div>
                    ) : null}
                    <FormLabel id="serviceId">Service Id</FormLabel>
                    <Field
                      type="number"
                      id="serviceId"
                      name="serviceId"
                      className="input-style"
                      placeholder="Enter serviceId (Number)"
                      step="any"
                      min={0}
                      onWheel={(e) => e.target.blur()}
                    />
                    {errors.serviceId && touched.serviceId ? (
                      <div className="error-color">{errors.serviceId}</div>
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
                        to="/dashboard/addons"
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
