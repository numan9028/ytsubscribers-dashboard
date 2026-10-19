import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
// material
import {
  Stack,
  TextField,
  Typography,
  Container,
  Grid,
  FormLabel,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { singlePageSection, updatePageSection } from 'src/Redux/actions/pageSectionActions';
import Loader from 'src/components/Loader';
// ----------------------------------------------------------------------

export default function EditProudlyDeliveredServices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Getting Data from Redux
  const pageState = useSelector((state) => state.pageSections.item);

  useEffect(() => {
    setDataLoading(true);
    dispatch(singlePageSection('numbers_section'));
    setDataLoading(false);
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    sectionMeta: Yup.object().shape({
      numbers: Yup.array().of(
        Yup.object({
          title: Yup.string().required('Title is required'),
          number: Yup.string().required('Number is required'),
          shortDescription: Yup.string().required('Description is required'),
          position: Yup.string().required('Position is required')
        })
      )
    })
  });

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item lg={10} md={10} xs={10} sm={10} mx="auto">
          <Card sx={{ minWidth: 275, pt: 2, pl: 3, boxShadow: 3, borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Edit Home Section - Proudly Delivered
              </Typography>
              {dataLoading && <Loader />}
              {!dataLoading && pageState && Object.keys(pageState).length > 0 && (
                <Formik
                  initialValues={pageState}
                  enableReinitialize
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
                  render={({ values }) => (
                    <Form>
                      <FieldArray name="sectionMeta.numbers">
                        {({ insert, remove, push }) => (
                          <div>
                            {values.sectionMeta.numbers?.length &&
                              values.sectionMeta.numbers.map((number, index) => (
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
                                    <FormLabel htmlFor={`sectionMeta.numbers.${index}.title`}>
                                      Title
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.numbers.${index}.title`}
                                      name={`sectionMeta.numbers.${index}.title`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.numbers.${index}.title`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                  <div className="col spacing-form-title">
                                    <FormLabel htmlFor={`sectionMeta.numbers.${index}.number`}>
                                      Number
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.numbers.${index}.number`}
                                      name={`sectionMeta.numbers.${index}.number`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.numbers.${index}.number`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                  <div className="col spacing-form-title">
                                    <FormLabel
                                      htmlFor={`sectionMeta.numbers.${index}.shortDescription`}
                                    >
                                      Short Description{' '}
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.numbers.${index}.shortDescription`}
                                      name={`sectionMeta.numbers.${index}.shortDescription`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.numbers.${index}.shortDescription`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                  <div className="col spacing-form-title">
                                    <FormLabel htmlFor={`sectionMeta.numbers.${index}.position`}>
                                      Position{' '}
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.numbers.${index}.position`}
                                      name={`sectionMeta.numbers.${index}.position`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.numbers.${index}.position`}
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
                            fullWidth
                            size="large"
                            variant="contained"
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
                        </Grid>
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
