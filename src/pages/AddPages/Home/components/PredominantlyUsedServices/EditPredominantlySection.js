import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Stack, Typography, Grid, FormLabel, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { singlePageSection, updatePageSection } from 'src/Redux/actions/pageSectionActions';
import Loader from 'src/components/Loader';
// ----------------------------------------------------------------------

export default function EditPredominantlySection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const pageState = useSelector((state) => state.pageSections.items);

  // Getting Data from Redux
  useEffect(() => {
    setDataLoading(true);
    dispatch(singlePageSection('main_services'));
    setDataLoading(false);
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    sectionMeta: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      Subtitle: Yup.string().required('Subtitle is required'),
      shortDescription: Yup.string().required('Short Description is required')
    })
  });

  return (
    <Grid container justifyContent="center">
      <Grid item lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3, boxShadow: 3, borderRadius: 1 }}>
          <CardContent>
            {dataLoading ? (
              <Loader />
            ) : (
              <Formik
                enableReinitialize={true}
                initialValues={{
                  sectionName: 'Predominantly Used Services',
                  sectionSlug: 'main_services',
                  pageId: '622b4abff6781e26ec7b3913',
                  active: true,
                  id: '622f216b4aa0372a50d55ea3',
                  sectionMeta: {
                    title: pageState.sectionMeta ? pageState.sectionMeta.title : '',
                    Subtitle: pageState.sectionMeta ? pageState.sectionMeta.Subtitle : '',
                    shortDescription: pageState.sectionMeta
                      ? pageState.sectionMeta.shortDescription
                      : ''
                  }
                }}
                validationSchema={SectionSchema}
                onSubmit={(values) => {
                  const id = pageState._id;
                  dispatch(updatePageSection(values, id));
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard/pages/home');
                  }, 1000);
                }}
              >
                {({ errors, touched, values }) => (
                  <Form autoComplete="off">
                    <Typography variant="h4" gutterBottom>
                      Edit Home Section - Predominantly
                    </Typography>
                    <Stack spacing={1} mt={2}>
                      <FormLabel id="radios">Title</FormLabel>
                      <Field
                        type="text"
                        id="title"
                        name="sectionMeta.title"
                        label="Enter Section Title"
                        className="input-style"
                        placeholder="Enter Section Title"
                      // value={values.sectionMeta?.title}
                      />
                      {errors.sectionMeta?.title && touched.sectionMeta?.title ? (
                        <div className="error-color">{errors.sectionMeta?.title}</div>
                      ) : null}
                      <FormLabel id="radios">Subtitle</FormLabel>
                      <Field
                        type="text"
                        id="Subtitle"
                        name="sectionMeta.Subtitle"
                        label="Enter Section SubTitle"
                        className="input-style"
                        placeholder="Enter Section SubTitle"
                      />
                      {errors.sectionMeta?.Subtitle && touched.sectionMeta?.Subtitle ? (
                        <div className="error-color">{errors.sectionMeta?.Subtitle}</div>
                      ) : null}
                      <FormLabel id="radios">Short Description</FormLabel>
                      <Field
                        type="text"
                        id="shortDescription"
                        name="sectionMeta.shortDescription"
                        label="Enter Section Short Description"
                        className="input-style"
                        placeholder="Enter Section Description"
                      />
                      {errors.sectionMeta?.shortDescription &&
                        touched.sectionMeta?.shortDescription ? (
                        <div className="error-color">{errors.sectionMeta?.shortDescription}</div>
                      ) : null}
                    </Stack>
                    <Grid container>
                      <Grid item xs={6} sm={6} md={3} lg={2} mt={2}>
                        <LoadingButton
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          loading={loading}
                        >
                          Submit
                        </LoadingButton>
                      </Grid>{' '}
                      <Grid item xs={4} sm={4} md={3} lg={2} ml={2} mt={2}>
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          color="error"
                          component={RouterLink}
                          to="/dashboard/pages/home"
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
