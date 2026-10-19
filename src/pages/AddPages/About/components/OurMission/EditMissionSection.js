import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
// material
import { Stack, Typography, TextField, Grid, FormLabel, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// Components
import RichTextEditor from 'src/components/RichTextEditor';
import Loader from 'src/components/Loader';
// Actions
import { singlePageSection, updatePageSection, API } from 'src/Redux/actions/pageSectionActions';
import { createImageFile } from 'src/Redux/helpers/generalHelper';
// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export default function EditMissionSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rteLoading, setRteLoading] = useState(false);
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
    dispatch(singlePageSection('about_mission_sec'));
  }, []);

  // For RTE Loading
  useEffect(() => {
    setRteLoading(true);
    setTimeout(() => {
      setRteLoading(false);
    }, 1000);
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
      <Grid item lg={8} md={8} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275, pt: 2, pl: 3 }}>
          <CardContent>
            {pageState.loading && <Loader />}
            {!pageState.loading && (
              <Formik
                enableReinitialize={true}
                initialValues={{
                  sectionName: 'About Mission Section',
                  sectionSlug: 'about_mission_sec',
                  pageId: '622f3ffc7cd7f83674e12b8e',
                  active: true,
                  id: '623c5802d91ee53cdc504ff6',
                  sectionMeta: {
                    title: pageState.item.sectionMeta ? pageState.item.sectionMeta.title : '',
                    Subtitle: pageState.item.sectionMeta ? pageState.item.sectionMeta.Subtitle : '',
                    shortDescription: pageState.item.sectionMeta
                      ? pageState.item.sectionMeta.shortDescription
                      : '',
                    image_1: pageState.item.sectionMeta ? pageState.item.sectionMeta?.image_1 : '',
                    image_2: pageState.item.sectionMeta ? pageState.item.sectionMeta?.image_2 : '',
                    image_3: pageState.item.sectionMeta ? pageState.item.sectionMeta?.image_3 : ''
                  }
                }}
                validationSchema={SectionSchema}
                onSubmit={async (values) => {
                  const data = {
                    sectionName: 'About Mission Section',
                    sectionSlug: 'about_mission_sec',
                    pageId: '622f3ffc7cd7f83674e12b8e',
                    active: true,
                    id: '623c5802d91ee53cdc504ff6',
                    sectionMeta: {
                      title: values.sectionMeta ? values.sectionMeta.title : '',
                      Subtitle: values.sectionMeta ? values.sectionMeta.Subtitle : '',
                      shortDescription: values.sectionMeta
                        ? values.sectionMeta.shortDescription
                        : '',
                      image_1: values.sectionMeta
                        ? values.sectionMeta.image_1
                        : pageState.sectionMeta?.image_1,
                      image_2: values.sectionMeta
                        ? values.sectionMeta.image_2
                        : pageState.sectionMeta?.image_2,
                      image_3: values.sectionMeta
                        ? values.sectionMeta.image_3
                        : pageState.sectionMeta?.image_3
                    }
                  };
                  // Image 1
                  const newImage = values.sectionMeta.image_1,
                    currImage = pageState.sectionMeta?.image_1;
                  if (newImage !== currImage) {
                    const formData = new FormData();
                    // Image 1
                    const newImageFile = await createImageFile(values.sectionMeta?.image_1);
                    formData.append('image[]', newImageFile);
                    try {
                      const res = await API({
                        url: '/uploads',
                        method: 'post',
                        data: formData
                      });
                      data.sectionMeta.image_1 = res.data.path;
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
                      Edit About - Our Mission Section
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
                        // id="Subtitle"
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
