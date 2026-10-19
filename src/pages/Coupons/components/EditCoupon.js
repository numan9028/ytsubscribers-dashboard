import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, Typography, Button, Grid, FormLabel, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { singleCoupon, updateCoupon } from 'src/Redux/actions/couponsActions';

export default function EditCoupon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const pageState = useSelector((state) => state.coupons.items);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  // Set Form Data - Coupon
  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.coupon]);

  // Get Single Coupon
  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleCoupon(id));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  // Validation Schema for From
  const AddCouponSchema = Yup.object().shape({
    promoName: Yup.string().required('Promo Name is required'),
    promoCode: Yup.string().required('Promo Code is required'),
    promoLimit: Yup.string()
      .max(3, 'Please enter number with 3 characters')
      .required('Promo Limit is required'),
    promoUsed: Yup.string()
      .max(3, 'Please enter number with 3 characters')
      .required('Promo Used is required'),
    discountPercent: Yup.string()
      .max(3, 'Please enter number with 3 characters')
      .required('Discound Percent is required'),
    startDate: Yup.date().required('Start Date is required').nullable(),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), "End date can't be before start date")
      .required('End Date is required')
      .nullable()
  });

  return (
    <Grid container justifyContent="center">
      <Grid item lg={8} md={8} xs={10} sm={10}>
        <Card sx={{ maxWidth: '100%' }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                id: id,
                promoName: pageState.coupon ? pageState.coupon.promoName : '',
                promoCode: pageState.coupon ? pageState.coupon.promoCode : '',
                promoLimit: pageState.coupon ? pageState.coupon.promoLimit : 0,
                promoUsed: pageState.coupon ? pageState.coupon.promoUsed : 0,
                discountPercent: pageState.coupon ? pageState.coupon.discountPercent : 0,
                startDate: pageState.coupon ? pageState.coupon.startDate : new Date(),
                endDate: pageState.coupon ? pageState.coupon.endDate : null
              }}
              validationSchema={AddCouponSchema}
              onSubmit={async (values) => {
                dispatch(updateCoupon(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Edit Coupon
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="promoName">Promo Name</FormLabel>
                    <Field
                      type="text"
                      id="promoName"
                      name="promoName"
                      className="input-style"
                      placeholder="Enter Promo Name"
                    />
                    {errors.promoName && touched.promoName ? (
                      <div className="error-color">{errors.promoName}</div>
                    ) : null}
                    <FormLabel id="promoCode">Promo Code</FormLabel>
                    <Field
                      type="text"
                      id="promoCode"
                      name="promoCode"
                      className="input-style"
                      placeholder="Enter Promo Code"
                    />
                    {errors.promoCode && touched.promoCode ? (
                      <div className="error-color">{errors.promoCode}</div>
                    ) : null}
                    <FormLabel id="promoLimit">Promo Limit</FormLabel>
                    <Field
                      type="text"
                      id="promoLimit"
                      name="promoLimit"
                      className="input-style"
                      placeholder="Enter Promo Limit"
                    />
                    {errors.promoLimit && touched.promoLimit ? (
                      <div className="error-color">{errors.promoLimit}</div>
                    ) : null}
                    <FormLabel id="promoUsed">Promo Used</FormLabel>
                    <Field
                      type="text"
                      id="promoUsed"
                      name="promoUsed"
                      className="input-style"
                      placeholder="Enter Promo Used"
                    />
                    {errors.promoUsed && touched.promoUsed ? (
                      <div className="error-color">{errors.promoUsed}</div>
                    ) : null}
                    <FormLabel id="discountPercent">Discount Percent</FormLabel>
                    <Field
                      type="text"
                      id="discountPercent"
                      name="discountPercent"
                      className="input-style"
                      placeholder="Enter Discount Percent"
                    />
                    {errors.discountPercent && touched.discountPercent ? (
                      <div className="error-color">{errors.discountPercent}</div>
                    ) : null}
                    <FormLabel id="startDate">Start Date</FormLabel>
                    <Grid>
                      <Grid lg={12} md={12} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Start Date"
                            name="startDate"
                            value={values.startDate}
                            onChange={(newValue) => {
                              setFieldValue('startDate', newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />{' '}
                        </LocalizationProvider>
                        {errors.startDate && touched.startDate ? (
                          <div className="error-color">{errors.startDate}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    {errors.name && touched.name ? (
                      <div className="error-color">{errors.name}</div>
                    ) : null}
                    <FormLabel id="endDate">End Date</FormLabel>
                    <Grid>
                      <Grid lg={12} md={12} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Select End Date"
                            name="endDate"
                            value={values.endDate}
                            onChange={(newValue) => {
                              setFieldValue('endDate', newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />{' '}
                        </LocalizationProvider>
                        {errors.endDate && touched.endDate ? (
                          <div className="error-color">{errors.endDate}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    {errors.name && touched.name ? (
                      <div className="error-color">{errors.name}</div>
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
                        to="/dashboard/coupons"
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
