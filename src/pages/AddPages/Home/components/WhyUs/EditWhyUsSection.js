import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
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
  CircularProgress,
  TextField
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RichTextEditor from 'src/components/RichTextEditor';
//
import { singlePageSection, updatePageSection } from 'src/Redux/actions/pageSectionActions';
import Loader from 'src/components/Loader';
// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/webp'];

export default function EditWhyUsSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Getting Data from Redux
  const pageState = useSelector((state) => state.pageSections);

  useEffect(() => {
    setDataLoading(true);
    dispatch(singlePageSection('why_us'));
    setDataLoading(false);
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    sectionMeta: Yup.object().shape({
      title: Yup.string().required('Main Title is required'),
      shortDescription: Yup.string().required('Main Description is required'),
      Subtitle: Yup.string('Main Subtitle is required'),
      whyus_cols: Yup.array().of(
        Yup.object({
          title: Yup.string().required('Cols Title is required'),
          shortDescription: Yup.string().required('Cols Number is required'),
          position: Yup.string().required('Cols Position is required')
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
                Edit Home Section - Why Us
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
                      navigate('/dashboard/pages/home');
                    }, 1000);
                  }}
                  render={({ values, setFieldValue }) => (
                    <Form>
                      {values.sectionMeta && (
                        <Stack spacing={1} mt={2}>
                          <div className="row">
                            <div className="col spacing-form-title">
                              <FormLabel htmlFor="sectionMeta.title">Main Title</FormLabel>
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
                              <FormLabel htmlFor="sectionMeta.Subtitle">Main Subtitle</FormLabel>
                              <Field
                                id="sectionMeta.Subtitle"
                                name="sectionMeta.Subtitle"
                                type="text"
                                placeholder="Enter Section Subtitle"
                                className="input-style"
                              />
                              <ErrorMessage
                                name="sectionMeta.Subtitle"
                                component="div"
                                className="error-color"
                              />
                            </div>
                            <div className="col spacing-form-title">
                              <FormLabel htmlFor="sectionMeta.shortDescription">
                                Main Description
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
                      <FieldArray name="sectionMeta.whyus_cols">
                        {({ remove, push }) => (
                          <div>
                            {values.sectionMeta?.whyus_cols?.length &&
                              values.sectionMeta?.whyus_cols.map((items, index) => (
                                <div className="row" key={index}>
                                  <div className="col button-style">
                                    <Button
                                      type="button"
                                      variant="contained"
                                      sx={{ mt: 2 }}
                                      onClick={() =>
                                        push({
                                          title: '',
                                          shortDescription: '',
                                          position: '',
                                          icon: ''
                                        })
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
                                    <FormLabel htmlFor={`sectionMeta.whyus_cols.${index}.title`}>
                                      Cols Title
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.whyus_cols.${index}.title`}
                                      name={`sectionMeta.whyus_cols.${index}.title`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.whyus_cols.${index}.title`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>

                                  <div className="col spacing-form-title">
                                    <FormLabel
                                      htmlFor={`sectionMeta.whyus_cols.${index}.shortDescription`}
                                    >
                                      Cols Description
                                    </FormLabel>

                                    <Field
                                      id={`sectionMeta.whyus_cols.${index}.shortDescription`}
                                      name={`sectionMeta.whyus_cols.${index}.shortDescription`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.whyus_cols.${index}.shortDescription`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                  <div className="col spacing-form-title">
                                    <FormLabel htmlFor={`sectionMeta.whyus_cols.${index}.position`}>
                                      Cols Position
                                    </FormLabel>
                                    <Field
                                      id={`sectionMeta.whyus_cols.${index}.position`}
                                      name={`sectionMeta.whyus_cols.${index}.position`}
                                      type="text"
                                      placeholder="Enter Section Title"
                                      className="input-style"
                                    />
                                    <ErrorMessage
                                      name={`sectionMeta.whyus_cols.${index}.position`}
                                      component="div"
                                      className="error-color"
                                    />
                                  </div>
                                  <Grid item xs={10} sm={10} md={6} lg={6} mt={2}>
                                    <FormLabel htmlFor={`sectionMeta.whyus_cols.${index}.icon`}>
                                      Change Image
                                    </FormLabel>
                                    <TextField
                                      value={values.icon}
                                      sx={{ mt: 1 }}
                                      id="file"
                                      name={`sectionMeta.whyus_cols.${index}.icon`}
                                      type="file"
                                      helperText="Required Image Dimensions: 80 x 80 px"
                                      onChange={(e) => {
                                        const image = e.target.files[0];
                                        if (!validTypes.includes(image.type)) {
                                          toast.error(
                                            'Please select an image, allowed file types are .jpg, .jpeg, .png & .webp.'
                                          );
                                          return false;
                                        }
                                        let imgLen = image.size <= 2000000;
                                        if (!imgLen) {
                                          toast.error('Image Size Should be less than 2Mbs.');
                                          return false;
                                        }
                                        const fileReader = new FileReader();
                                        fileReader.onload = () => {
                                          if (fileReader.readyState === 2) {
                                            setFieldValue(
                                              `sectionMeta.whyus_cols.${index}.icon`,
                                              fileReader.result
                                            );
                                          }
                                        };
                                        fileReader.readAsDataURL(image);
                                      }}
                                    />
                                  </Grid>
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
