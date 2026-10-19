import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
// material
import { Stack, Typography, Grid, FormLabel, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// Components
import RichTextEditor from 'src/components/RichTextEditor';
import Loader from 'src/components/Loader';
//
import { singlePageSection, updatePageSection, API } from 'src/Redux/actions/pageSectionActions';
import { createImageFile } from 'src/Redux/helpers/generalHelper';

// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export default function EditAboutTopSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const pageState = useSelector((state) => state.pageSections.items);
  const [metaValues, setPageSection] = useState({
    sectionMeta: {}
  });
  const formData = pageState;

  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.sectionMeta]);

  // Getting Data from Redux
  useEffect(() => {
    dispatch(singlePageSection('about_top_sec'));
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    sectionMeta: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      shortDescription: Yup.string().required('Description is required'),
      image: Yup.string().required('Image is required')
    })
  });

  return (
    <Grid container justifyContent="center">
      <Grid item lg={10} md={10} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3 }}>
          <CardContent>
            {pageState.loading && <Loader />}
            {!pageState.loading && (
              <Formik
                enableReinitialize={true}
                initialValues={{
                  sectionName: 'About Top Section',
                  sectionSlug: 'about_top_sec',
                  pageId: '622f3ffc7cd7f83674e12b8e',
                  active: true,
                  id: '623c576ed91ee53cdc504ff3',
                  sectionMeta: {
                    title: pageState.sectionMeta ? pageState.sectionMeta.title : '',
                    Subtitle: pageState.sectionMeta ? pageState.sectionMeta.Subtitle : '',
                    shortDescription: pageState.sectionMeta
                      ? pageState.sectionMeta.shortDescription
                      : '',
                    image: metaValues.sectionMeta ? metaValues.sectionMeta?.image : ''
                  }
                }}
                validationSchema={SectionSchema}
                onSubmit={async (values) => {
                  const data = {
                    sectionName: 'About Top Section',
                    sectionSlug: 'about_top_sec',
                    pageId: '622f3ffc7cd7f83674e12b8e',
                    active: true,
                    id: '623c576ed91ee53cdc504ff3',
                    sectionMeta: {
                      title: values.sectionMeta ? values.sectionMeta.title : '',
                      Subtitle: values.sectionMeta ? values.sectionMeta.Subtitle : '',
                      shortDescription: values.sectionMeta
                        ? values.sectionMeta.shortDescription
                        : '',
                      image: values.sectionMeta
                        ? values.sectionMeta.image
                        : pageState.sectionMeta?.image
                    }
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
                  const id = pageState._id;
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
                      Edit About - Top Section
                    </Typography>
                    {/* {metaValues.sectionMeta?.title} */}
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
                      <FormLabel id="Subtitle">Subtitle</FormLabel>

                      <Field
                        type="text"
                        id="Subtitle"
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
                            src={`${process.env.REACT_APP_NODE_ROOT}/uploads/${pageState.sectionMeta?.image}`}
                            alt="Section"
                            width="255"
                            height="180"
                          />
                        </Grid>
                        <Grid xs={6} sm={6} md={6} lg={6} mt={2}>
                          <FormLabel id="image"> Upload New</FormLabel>
                          <br />
                          <TextField
                            sx={{ mt: 1 }}
                            id="file"
                            name="sectionMeta.image"
                            type="file"
                            onChange={(e) => {
                              const image = e.target.files[0];
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
                                }
                              };
                              fileReader.readAsDataURL(image);
                            }}
                          />
                        </Grid>
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
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
