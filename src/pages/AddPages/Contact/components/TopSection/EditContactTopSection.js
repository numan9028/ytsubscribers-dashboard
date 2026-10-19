import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
// material
import {
  Stack,
  Typography,
  Container,
  Grid,
  FormLabel,
  Button,
  CircularProgress
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import Loader from 'src/components/Loader';
import RichTextEditor from 'src/components/RichTextEditor';
//
import { singlePageSection, updatePageSection } from 'src/Redux/actions/pageSectionActions';

export default function EditContactTopSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const pageState = useSelector((state) => state.pageSections);

  // Getting Data from Redux
  useEffect(() => {
    setDataLoading(true);
    dispatch(singlePageSection('contact_cards'));
    setDataLoading(false);
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    sectionMeta: Yup.object().shape({
      title: Yup.string().required('Main Title is required'),
      Subtitle: Yup.string().required('Subtitle is required'),
      cards: Yup.array().of(
        Yup.object({
          cardTitle: Yup.string().required('Card Title is required'),
          cardText: Yup.string().required('Card Text is required')
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
                Edit Contact - Top Section
              </Typography>
              {dataLoading && <Loader />}
              {!dataLoading && pageState.item && Object.keys(pageState.item).length > 0 && (
                <Formik
                  initialValues={pageState.item}
                  enableReinitialize
                  validationSchema={SectionSchema}
                  onSubmit={(values) => {
                    const id = pageState.item._id;
                    dispatch(updatePageSection(values, id));
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      navigate('/dashboard/pages/contact');
                    }, 1000);
                  }}
                  render={({ values, setFieldValue }) => (
                    <Form>
                      {values.sectionMeta && (
                        <Stack spacing={1} mt={2}>
                          <div className="row">
                            <div className="col spacing-form-title">
                              <FormLabel htmlFor="sectionMeta.title">Title</FormLabel>
                              <Field
                                id="sectionMeta.title"
                                name="sectionMeta.title"
                                type="text"
                                placeholder="Enter Section Title"
                                className="input-style"
                              />
                              <ErrorMessage
                                name="sectionMeta.title"
                                component="div"
                                className="error-color"
                              />
                            </div>
                            <div className="col spacing-form-title">
                              <FormLabel htmlFor="sectionMeta.Subtitle">Subtitle</FormLabel>
                              <RichTextEditor
                                setFieldValue={setFieldValue}
                                name="sectionMeta.Subtitle"
                                value={values.sectionMeta.Subtitle}
                              />

                              <ErrorMessage
                                name="sectionMeta.Subtitle"
                                component="div"
                                className="error-color"
                              />
                            </div>
                            <div className="col spacing-form-title">
                              <FormLabel htmlFor="sectionMeta.shortDescription">
                                Description
                              </FormLabel>
                              <RichTextEditor
                                setFieldValue={setFieldValue}
                                name="sectionMeta.shortDescription"
                                value={values.sectionMeta.shortDescription}
                              />
                              <ErrorMessage
                                name="sectionMeta.shortDescription"
                                component="div"
                                className="error-color"
                              />
                            </div>
                          </div>
                        </Stack>
                      )}
                      <FieldArray name="sectionMeta.cards">
                        {({ remove, push }) => (
                          <div style={{ marginTop: '10px' }}>
                            <h2>Contact Us Sections</h2>
                            {values.sectionMeta.cards?.length &&
                              values.sectionMeta.cards.map((items, index) => (
                                <div className="row" key={index}>
                                  {/* <div className="col button-style">
                                    <Button
                                      type="button"
                                      variant="contained"
                                      sx={{ mt: 2 }}
                                      onClick={() =>
                                        push({ title: '', shortDescription: '', Subtitle: '' })
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
                                  </div> */}

                                  <div className="col spacing-form-title">
                                    <FormLabel htmlFor={`sectionMeta.cards.${index}.cardTitle`}>
                                      Card Title (Column {index + 1})
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.cards.${index}.cardTitle`}
                                      name={`sectionMeta.cards.${index}.cardTitle`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.cards.${index}.cardTitle`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                  <div className="col spacing-form-title">
                                    <FormLabel htmlFor={`sectionMeta.cards.${index}.cardText`}>
                                      Card Text{' '}
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.cards.${index}.cardText`}
                                      name={`sectionMeta.cards.${index}.cardText`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.cards.${index}.cardText`}
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
                        <Grid xs={3} sm={3} md={3} lg={2} mt={3} item>
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
                        </Grid>
                        <Grid xs={3} sm={3} md={3} lg={2} ml={2} mt={3} item>
                          <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="error"
                            component={RouterLink}
                            to="/dashboard/pages/contact"
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
