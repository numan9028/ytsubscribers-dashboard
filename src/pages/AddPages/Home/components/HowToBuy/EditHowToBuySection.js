import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
// material
import { Typography, Container, Grid, FormLabel, Button, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import Loader from 'src/components/Loader';
// ----------------------------------------------------------------------
import { singlePageSection, updatePageSection } from 'src/Redux/actions/pageSectionActions';

export default function EditHowToBuySection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Getting Data from Redux
  const pageState = useSelector((state) => state.pageSections);

  useEffect(() => {
    setDataLoading(true);
    dispatch(singlePageSection('how_to_buy'));
    setDataLoading(false);
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    sectionMeta: Yup.object().shape({
      steps: Yup.array().of(
        Yup.object({
          title: Yup.string().required('Title is required'),
          shortDescription: Yup.string().required('Description is required'),
          position: Yup.string().required('Position is required')
        })
      )
    })
  });

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid lg={10} md={10} xs={10} sm={10} mx="auto">
          <Card sx={{ minWidth: 275, pl: 5, pt: 2, boxShadow: 3, borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Edit Home Section - How To Buy
              </Typography>
              {dataLoading && <Loader />}
              {!dataLoading && pageState.item && Object.keys(pageState.item).length > 0 && (
                <Formik
                  initialValues={pageState.item}
                  enableReinitialize={true}
                  validationSchema={SectionSchema}
                  onSubmit={(values) => {
                    const id = pageState.item._id;
                    dispatch(updatePageSection(values, id));
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      navigate('/dashboard/pages/home');
                    }, 1000);
                  }}
                  render={({ values }) => (
                    <Form>
                      <FieldArray name="sectionMeta.steps">
                        {({ remove, push }) => (
                          <div>
                            {values.sectionMeta.steps?.length &&
                              values.sectionMeta.steps.map((step, index) => (
                                <div className="row" key={index}>
                                  <div className="col button-style">
                                    <Button
                                      type="button"
                                      variant="contained"
                                      sx={{ mt: 2 }}
                                      onClick={() =>
                                        push({ title: '', shortDescription: '', position: '' })
                                      }
                                    >
                                      Add Section
                                    </Button>

                                    <Button
                                      type="button"
                                      sx={{ mt: 2 }}
                                      variant="contained"
                                      onClick={() => remove(index)}
                                      className="home-section-delete-button"
                                    >
                                      Delete Section
                                    </Button>
                                  </div>
                                  <div className="col spacing-form-title">
                                    <FormLabel htmlFor={`steps.${index}.title`}>Title</FormLabel>
                                    <Field
                                      id={`steps.${index}.title`}
                                      name={`sectionMeta.steps.${index}.title`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.steps.${index}.title`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                  <div className="col spacing-form-title">
                                    <FormLabel
                                      htmlFor={`sectionMeta.steps.${index}.shortDescription`}
                                    >
                                      Short Description{' '}
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.steps.${index}.shortDescription`}
                                      name={`sectionMeta.steps.${index}.shortDescription`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.steps.${index}.shortDescription`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                  <div className="col spacing-form-title">
                                    <FormLabel htmlFor={`sectionMeta.steps.${index}.position`}>
                                      Position{' '}
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.steps.${index}.position`}
                                      name={`sectionMeta.steps.${index}.position`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.steps.${index}.position`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </FieldArray>
                      <Grid container>
                        <Grid item xs={4} sm={4} md={3} lg={2} mt={3}>
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            type="submit"
                            disabled={loading}
                          >
                            Submit
                            {loading && (
                              <CircularProgress
                                size={24}
                                sx={{
                                  marginLeft: '10px'
                                }}
                              />
                            )}
                          </Button>
                        </Grid>{' '}
                        <Grid item xs={4} sm={4} md={3} lg={2} ml={2} mt={3}>
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
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
