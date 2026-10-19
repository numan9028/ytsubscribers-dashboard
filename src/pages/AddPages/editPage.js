import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
// material
import { Typography, Container, Grid, FormLabel, Button, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//
import Loader from 'src/components/Loader';
// ----------------------------------------------------------------------
import { singlePageSection, updatePageContent, getPageById } from 'src/Redux/actions/pageSectionActions';

const pageRoutes = {
  '/': '/home',
  '/about': '/about',
  '/faqs': '/faq',
  '/contact': '/contact',
};

export default function EditMainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageId } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Getting Data from Redux
  const pageState = useSelector((state) => state.pageSections);

  useEffect(() => {
    setDataLoading(true);
    dispatch(getPageById(pageId));
    setDataLoading(false);
  }, []);

  // Validation Schema for From
  const PageSchema = Yup.object({
    pageName: Yup.string().required('Page Name is required'),
  });

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid lg={10} md={10} xs={10} sm={10} mx="auto">
          <Card sx={{ minWidth: 275, pl: 5, pt: 2, boxShadow: 3, borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Edit Page
              </Typography>
              {dataLoading && <Loader />}
              {!dataLoading && pageState.item && Object.keys(pageState.item).length > 0 && (
                <Formik
                  initialValues={{
                    pageName: pageState.item.pageName,
                    metaTitle: pageState.item.metaTitle,
                    metaDescription: pageState.item.metaDescription,
                    canonicalLink: pageState.item.canonicalLink,
                    pageSlug: pageState.item.pageSlug,
                  }}
                  enableReinitialize={true}
                  validationSchema={PageSchema}
                  onSubmit={async (values) => {
                    setLoading(true);
                    dispatch(updatePageContent(values, navigate, `/dashboard/pages${pageRoutes[values.pageSlug]}`));
                  }}>
                  {() => (
                    <Form>

                      <div className="col spacing-form-title">
                        <FormLabel
                          htmlFor="pageName"
                        >
                          Page Name
                        </FormLabel>
                        <Field
                          id="pageName"
                          name="pageName"
                          type="text"
                          placeholder="Enter page Title"
                          className="input-style"
                        />
                        <ErrorMessage
                          name="pageName"
                          component="div"
                          className="error-color"
                        />
                      </div>

                      <div className="col spacing-form-title">
                        <FormLabel
                          htmlFor="metaTitle"
                        >
                          SEO Meta Title
                        </FormLabel>
                        <Field
                          id="metaTitle"
                          name="metaTitle"
                          type="text"
                          placeholder="Enter Meta Title"
                          className="input-style"
                        />
                      </div>

                      <div className="col spacing-form-title">
                        <FormLabel
                          htmlFor="metaDescription"
                        >
                          SEO Meta Description
                        </FormLabel>
                        <Field
                          id="metaDescription"
                          name="metaDescription"
                          type="text"
                          placeholder="Write Meta Description"
                          className="input-style"
                        />
                      </div>

                      <div className="col spacing-form-title">
                        <FormLabel
                          htmlFor="canonicalLink"
                        >
                          Canonical Link
                        </FormLabel>
                        <Field
                          id="canonicalLink"
                          name="canonicalLink"
                          type="text"
                          placeholder="Enter Canonical Link"
                          className="input-style"
                        />
                      </div>
                      <Grid container>
                        <Grid item xs={4} sm={4} md={3} lg={2} mt={3}>
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            type="submit"
                            disabled={loading}
                          >
                            <span style={{ marginRight: 10 }}>Submit</span>
                            {loading && (
                              <CircularProgress
                                size={20}
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
                            to={`/dashboard/pages${pageRoutes[pageState.item.pageSlug]}`}
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
      </Grid >
    </Container >
  );
}
