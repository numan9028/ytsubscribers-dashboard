import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
// material
import { Stack, Typography, Button, Grid, FormLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { request } from 'src/Redux/helpers/axiosRequest';
import RichTextEditor from 'src/components/RichTextEditor';
import MultipleSelectChip from './MultipleSelectChip';
// import Loader from 'src/components/Loader';
//
import { singlePackage, updatePackage } from 'src/Redux/actions/packageActions';
import { singleDuration, updateDuration } from 'src/Redux/actions/durationActions';

export default function EditDuration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [personName, setPersonName] = useState([]);
  const durationState = useSelector((state) => state.durations?.items);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleDuration(id));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  const DurationSchema = Yup.object().shape({
    duration: Yup.string().required('Duration title is required'),
  });

  return (
    <Grid container>
      <Grid item lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, p: 4 }}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              id: id,
              duration: durationState.duration ? durationState.duration : '',
            }}
            validationSchema={DurationSchema}
            onSubmit={async (values) => {
              dispatch(updateDuration(values, navigate));
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 3000);
            }}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form autoComplete="off">
                <Typography variant="h4" gutterBottom>
                  Edit Duration
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
                      to="/dashboard/durations"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}

          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
}
