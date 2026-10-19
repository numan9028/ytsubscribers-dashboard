import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
// material
import { Stack, Typography, Grid, FormLabel, CircularProgress, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import { Editor } from '@tinymce/tinymce-react';
import Loader from 'src/components/Loader';
// Actions
import { addPageSection } from 'src/Redux/actions/pageSectionActions';
//

export default function CreatePrivacy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rteLoading, setRteLoading] = useState(false);
  // Validation Schema for From
  const SectionSchema = Yup.object().shape({
    pageName: Yup.string().required('Page Name is required'),
    pageSlug: Yup.string().required('Page Slug is required')
  });

  useEffect(() => {
    setRteLoading(true);
    setTimeout(() => {
      setRteLoading(false);
    }, 1000);
  }, []);

  return (
    <Grid container direction="grid" justifyContent="center" mx="auto">
      <Grid item lg={8} md={8} xs={10} sm={10}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                pageName: '',
                metaTitle: '',
                metaDescription: '',
                canonicalLink: '',
                pageSlug: '',
                content: ''
              }}
              validationSchema={SectionSchema}
              onSubmit={(values) => {
                console.log('Privacy//:', values);
                dispatch(addPageSection(values, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Add Terms of Service
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
                    />
                    {errors.pageSlug && touched.pageSlug ? (
                      <div className="error-color">{errors.pageSlug}</div>
                    ) : null}
                    <FormLabel id="content">Content</FormLabel>
                    {rteLoading ? (
                      <Loader />
                    ) : (
                      <Editor
                        name="content"
                        apiKey={process.env.REACT_APP_RTE_KEY}
                        init={{
                          selector: 'textarea#default-editor',
                          height: 200,
                          width: '94%',
                          menubar: true,
                          forced_root_block: '',
                          branding: false
                        }}
                        onEditorChange={(content) => setFieldValue('content', content)}
                      />
                    )}
                    {errors.content && touched.content ? (
                      <div className="error-color">{errors.content}</div>
                    ) : null}
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
                    <Grid item xs={4} sm={4} md={3} lg={2} ml={3} mt={3}>
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
