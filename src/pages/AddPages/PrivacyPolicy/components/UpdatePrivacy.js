import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { request } from 'src/Redux/helpers/axiosRequest';
// material
import { Stack, Typography, Grid, FormLabel, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import Loader from 'src/components/Loader';
import RichTextEditor from 'src/components/RichTextEditor';
// Actions
import { updatePage } from 'src/Redux/actions/pageSectionActions';

const UpdatePrivacy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [privacies, setPrivacies] = useState([]);

  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/page/get-by-id/${id}`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setPrivacies(data);
        setLoading(false);
      });
  }, []);

  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    pageName: Yup.string().required('Page Name is required'),
    slug: Yup.string().required('Slug is required')
  });

  return (
    <Grid container justifyContent="center">
      <Grid lg={8} md={8} xs={10} sm={10} mx="auto">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {loading && <Loader />}
            {!loading && (
              <Formik
                enableReinitialize={true}
                initialValues={{
                  slug: privacies.pageSlug,
                  pageName: privacies ? privacies.pageName : '',
                  metaTitle: privacies ? privacies.metaTitle : '',
                  metaDescription: privacies ? privacies.metaDescription : '',
                  canonicalLink: privacies ? privacies.canonicalLink : '',
                  pageSlug: privacies ? privacies.pageSlug : '',
                  content: privacies ? privacies.content : '',
                  link: '/dashboard/pages/terms'
                }}
                validationSchema={SectionSchema}
                onSubmit={(values) => {
                  dispatch(updatePage(values, navigate));
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form autoComplete="off">
                    <Typography variant="h4" gutterBottom>
                      Edit Terms of Service
                    </Typography>
                    <Stack spacing={1} mt={2}>
                      <FormLabel id="pageName">Page Name</FormLabel>
                      <Field
                        type="text"
                        id="pageName"
                        name="pageName"
                        className="input-style"
                        placeholder="Enter Page Name"
                      />
                      {errors.pageName && touched.pageName ? (
                        <div className="error-color">{errors.pageName}</div>
                      ) : null}
                      <FormLabel id="metaTitle">Meta Title</FormLabel>
                      <Field
                        type="text"
                        id="metaTitle"
                        name="metaTitle"
                        className="input-style"
                        placeholder="Enter Page Name"
                      />
                      {errors.metaTitle && touched.metaTitle ? (
                        <div className="error-color">{errors.metaTitle}</div>
                      ) : null}
                      <FormLabel id="metaDescription">Meta Description</FormLabel>
                      <Field
                        type="text"
                        id="metaDescription"
                        name="metaDescription"
                        className="input-style"
                        placeholder="Enter Page Name"
                      />
                      {errors.metaDescription && touched.metaDescription ? (
                        <div className="error-color">{errors.metaDescription}</div>
                      ) : null}
                      <FormLabel id="canonicalLink">Canonical Link</FormLabel>
                      <Field
                        type="text"
                        id="canonicalLink"
                        name="canonicalLink"
                        className="input-style"
                        placeholder="Enter Page Name"
                      />
                      {errors.canonicalLink && touched.canonicalLink ? (
                        <div className="error-color">{errors.canonicalLink}</div>
                      ) : null}
                      <FormLabel id="pageSlug">Page Slug</FormLabel>
                      <Field
                        type="text"
                        id="pageSlug"
                        name="pageSlug"
                        className="input-style"
                        placeholder="Enter Page Name"
                        disabled={true}
                      />
                      <p className="helper-text-style">Cannot change Page Slug.</p>
                      {errors.pageSlug && touched.pageSlug ? (
                        <div className="error-color">{errors.pageSlug}</div>
                      ) : null}
                      <FormLabel id="content">Content</FormLabel>
                      <RichTextEditor
                        setFieldValue={setFieldValue}
                        name="content"
                        value={values.content}
                      />
                      {errors.content && touched.content ? (
                        <div className="error-color">{errors.content}</div>
                      ) : null}
                    </Stack>
                    <Grid container>
                      <Grid xs={4} sm={4} md={3} lg={2} mt={3}>
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
                      <Grid xs={4} sm={4} md={3} lg={2} ml={3} mt={3}>
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          color="error"
                          component={RouterLink}
                          to="/dashboard/pages/terms"
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
};
export default UpdatePrivacy;
