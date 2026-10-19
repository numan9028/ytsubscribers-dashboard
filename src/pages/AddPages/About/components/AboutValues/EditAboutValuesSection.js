import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
// material
import { Stack, Typography, TextField, Grid, FormLabel, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import RichTextEditor from 'src/components/RichTextEditor';
//
import { createImageFile } from 'src/Redux/helpers/generalHelper';
import { singlePageSection, updatePageSection, API } from 'src/Redux/actions/pageSectionActions';
// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];

export default function EditAboutValuesSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const pageState = useSelector((state) => state.pageSections);
  const [metaValues, setPageSection] = useState({
    sectionMeta: {}
  });
  const formData = pageState.item;

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.item.sectionMeta]);
  // Getting Data from Redux
  useEffect(() => {
    dispatch(singlePageSection('about_six_values'));
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    sectionMeta: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      // Subtitle: Yup.string().required('Subtitle is required'),
      shortDescription: Yup.string().required('Description is required')
      // image: Yup.string().required('Image is required')
    })
  });

  return (
    <Grid container justifyContent="center">
      <Grid item lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                sectionMeta: {
                  title: pageState.item.sectionMeta ? pageState.item.sectionMeta.title : '',
                  Subtitle: pageState.item.sectionMeta ? pageState.item.sectionMeta.Subtitle : '',
                  shortDescription: pageState.item.sectionMeta
                    ? pageState.item.sectionMeta.shortDescription
                    : '',
                  image: pageState.item.sectionMeta ? pageState.item.sectionMeta?.image : ''
                }
              }}
              validationSchema={SectionSchema}
              onSubmit={async (values) => {
                const data = {
                  sectionName: 'About Six Values',
                  sectionSlug: 'about_six_values',
                  pageId: '622f3ffc7cd7f83674e12b8e',
                  id: '623c5850d91ee53cdc504ff9',
                  sectionMeta: {
                    title: values.sectionMeta ? values.sectionMeta.title : '',
                    Subtitle: values.sectionMeta ? values.sectionMeta.Subtitle : '',
                    shortDescription: values.sectionMeta ? values.sectionMeta.shortDescription : '',
                    image: values.sectionMeta
                      ? values.sectionMeta.image
                      : pageState.sectionMeta?.image
                  },
                  active: true
                };
                const newImage = values.sectionMeta.image,
                  currImage = pageState.sectionMeta?.image;
                if (newImage !== currImage) {
                  const formData = new FormData();
                  const newImageFile = await createImageFile(values.sectionMeta?.image);
                  formData.append('image', newImageFile);
                  try {
                    const res = await API({
                      url: '/uploads',
                      method: 'post',
                      data: formData
                    });
                    data.sectionMeta.image = res.data.path;
                  } catch (error) {
                    console.log(error);
                  }
                }
                const id = pageState.item._id;
                dispatch(updatePageSection(data, id));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  navigate('/dashboard/pages/about');
                }, 1000);
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Edit About - Our Values Section
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="title">Title</FormLabel>
                    <RichTextEditor
                      setFieldValue={setFieldValue}
                      name="sectionMeta.title"
                      value={values.sectionMeta.title}
                    />
                    {errors.sectionMeta?.title && touched.sectionMeta?.title ? (
                      <div className="error-color">{errors.sectionMeta?.title}</div>
                    ) : null}
                    <FormLabel id="subTitle">Subtitle</FormLabel>
                    <Field
                      type="text"
                      name="sectionMeta.Subtitle"
                      className="input-style"
                      placeholder="Enter Section SubTitle"
                    />
                    {errors.sectionMeta?.Subtitle && touched.sectionMeta?.Subtitle ? (
                      <div className="error-color">{errors.sectionMeta?.Subtitle}</div>
                    ) : null}
                    <FormLabel id="shortDescription">Description</FormLabel>
                    <RichTextEditor
                      setFieldValue={setFieldValue}
                      name="sectionMeta.shortDescription"
                      value={values.sectionMeta.shortDescription}
                    />
                    {errors.sectionMeta?.shortDescription &&
                    touched.sectionMeta?.shortDescription ? (
                      <div className="error-color">{errors.sectionMeta?.shortDescription}</div>
                    ) : null}
                    <Grid container>
                      <Grid xs={6} sm={6} md={6} lg={6} mt={2}>
                        <FormLabel id="image"> Preview</FormLabel>
                        <img
                          src={`${process.env.REACT_APP_NODE_ROOT}/uploads/${pageState.item.sectionMeta?.image}`}
                          alt="Section"
                          width="255"
                          height="180"
                        />{' '}
                      </Grid>
                      <Grid xs={6} sm={6} md={6} lg={6} mt={2}>
                        <FormLabel id="image">Section Image</FormLabel>
                        <br />
                        <TextField
                          sx={{ mt: 1 }}
                          id="file"
                          name="sectionMeta.image"
                          type="file"
                          onChange={(e) => {
                            const image = e.target.files[0];
                            console.log(image);
                            if (!validTypes.includes(image.type)) {
                              toast.error(
                                'Please select an image, allowed file types are .jpg, .jpeg & .png.'
                              );
                              return false;
                            }
                            const fileReader = new FileReader();
                            fileReader.onload = () => {
                              if (fileReader.readyState === 2) {
                                setFieldValue('sectionMeta.image', fileReader.result);
                                // setAvatarPreview(fileReader.result);
                              }
                            };
                            fileReader.readAsDataURL(image);
                          }}
                        />
                      </Grid>{' '}
                    </Grid>
                  </Stack>
                  <Grid container>
                    <Grid xs={6} sm={6} md={3} lg={2} mt={2}>
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
                    <Grid xs={4} sm={4} md={3} lg={2} ml={3} mt={2}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/dashboard/pages/about"
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
