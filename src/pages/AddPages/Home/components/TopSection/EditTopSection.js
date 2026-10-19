import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
// material
import { Stack, TextField, Typography, Button, Grid, FormLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RichTextEditor from 'src/components/RichTextEditor';
import Loader from 'src/components/Loader';
//
import { singlePageSection, updatePageSection, API } from 'src/Redux/actions/pageSectionActions';
import { createImageFile } from 'src/Redux/helpers/generalHelper';
//
// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/svg+xml', 'image/png', 'image/webp'];
// Image Validation

export default function EditTopSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const pageState = useSelector((state) => state.pageSections.items);

  useEffect(() => {
    setDataLoading(true);
    dispatch(singlePageSection('hero_section'));
    setDataLoading(false);
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    sectionMeta: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      Subtitle: Yup.string().required('Subtitle is required')
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
                  sectionName: 'Top Section',
                  sectionSlug: 'hero_section',
                  pageId: '622b4abff6781e26ec7b3913',
                  active: true,
                  id: '622b5e90179c0b30d0ea5d9d',
                  sectionMeta: {
                    title: pageState.sectionMeta ? pageState.sectionMeta.title : '',
                    Subtitle: pageState.sectionMeta ? pageState.sectionMeta.Subtitle : '',
                    image: pageState.sectionMeta ? pageState.sectionMeta?.image : ''
                  }
                }}
                validationSchema={SectionSchema}
                onSubmit={async (values) => {
                  const data = {
                    sectionName: 'Top Section',
                    sectionSlug: 'hero_section',
                    pageId: '622b4abff6781e26ec7b3913',
                    active: true,
                    id: '622b5e90179c0b30d0ea5d9d',
                    sectionMeta: {
                      title: values.sectionMeta ? values.sectionMeta.title : '',
                      Subtitle: values.sectionMeta ? values.sectionMeta.Subtitle : '',
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
                  // console.log('data', data);
                  dispatch(updatePageSection(data, id));
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard/pages/home');
                  }, 1000);
                }}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form autoComplete="off">
                    <Typography variant="h4" gutterBottom>
                      Edit Home - Top Section
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
                        id="Subtitle"
                        name="sectionMeta.Subtitle"
                        className="input-style"
                        placeholder="Enter Section SubTitle"
                      />
                      {errors.sectionMeta?.Subtitle && touched.sectionMeta?.Subtitle ? (
                        <div className="error-color">{errors.sectionMeta?.Subtitle}</div>
                      ) : null}
                      <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6} mt={2}>
                          <FormLabel id="image">Preview</FormLabel>
                          <img
                            src={`${process.env.REACT_APP_NODE_ROOT}/uploads/${pageState.sectionMeta?.image}`}
                            alt={pageState.sectionMeta?.title}
                            width="255"
                            height="180"
                          />
                        </Grid>
                        <Grid item xs={10} sm={10} md={6} lg={6} mt={2}>
                          <FormLabel id="image"> Upload New</FormLabel>
                          <br />
                          <TextField
                            sx={{ mt: 1 }}
                            id="file"
                            name="sectionMeta.image"
                            type="file"
                            onChange={(e) => {
                              const image = e.target.files[0];
                              console.log('|image', image);
                              if (!validTypes.includes(image.type)) {
                                toast.error(
                                  'Please select an image, allowed file types are .jpg, .jpeg & .png.'
                                );
                                return false;
                              }
                              console.log('|image', image);
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
                        </Grid>
                      </Grid>
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
