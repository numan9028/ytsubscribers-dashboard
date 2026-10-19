import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//

import { addDuration } from 'src/Redux/actions/durationActions';

export default function AddDuration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [personName, setPersonName] = useState([]);
  const [loading, setLoading] = useState(false);
 



  // Validation Schema for From
  const DurationSchema = Yup.object().shape({
    duration: Yup.string().required('Duration title is required'),
  });

  return (
    <Grid container>
      <Grid item lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, p: 4 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                duration: '',
              }}
              validationSchema={DurationSchema}
              onSubmit={async (values) => {
                dispatch(addDuration(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Add New Duration
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="duration">Duration title</FormLabel>
                    <Field
                      type="text"
                      id="duration"
                      name="duration"
                      className="input-style"
                      placeholder="Enter duration title"
                    />
                    {errors.price && touched.price ? (
                      <div className="error-color">{errors.price}</div>
                    ) : null}
                   
                  </Stack>
                  <Grid container>
                    <Grid xs={4} sm={4} md={3} lg={2} mt={3} item>
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
                    <Grid xs={4} sm={4} md={3} lg={2} ml={2} mt={3} item>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/dashboard/durations"
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
