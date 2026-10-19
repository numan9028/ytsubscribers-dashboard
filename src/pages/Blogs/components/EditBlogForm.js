import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Stack, Typography, Grid, FormLabel, Button, TextField } from '@mui/material';
import { Switch } from 'formik-mui';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
//
import BlogRTE from 'src/components/BlogRTE';
import { createImageFile } from 'src/Redux/helpers/generalHelper'; // Create Image File
import { updateBlog, singleBlog, API } from 'src/Redux/actions/blogsActions'; // Actions
// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']; // Image Validation

export default function EditBlogForm() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rteLoading, setRteLoading] = useState(false); // For RTE Loading
  const pageState = useSelector((state) => state.blogs.items);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  // For Edit Blog
  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.faqs]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleBlog(slug));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  // Validation Schema
  const BlogSchema = Yup.object().shape({
    title: Yup.string().required('Blog Title is required'),
    slug: Yup.string().required('Blog Slug is required'),
    metaDescription: Yup.string().required('Blog description is required'),
    // canonicalLink: Yup.string().required('Blog canonical link is required'),
    body: Yup.string().required('Blog body is required'),
    postImg: Yup.string().required('Blog Image is required')
  });

  // RTE
  useEffect(() => {
    setRteLoading(true);
    setTimeout(() => {
      setRteLoading(false);
    }, 1000);
  }, []);
  return (
    <Grid container justifyContent="center">
      <Grid item lg={10} md={10} xs={10} sm={10}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Formik
              enableReinitialize={true}
              initialValues={{
                title: pageState.title ? pageState.title : '',
                slug: pageState.slug ? pageState.slug : '',
                metaDescription: pageState.metaDescription ? pageState.metaDescription : '',
                body: pageState.body ? pageState.body : '',
                postImg: pageState.postImg ? pageState?.postImg : '',
                canonicalLink: pageState.canonicalLink ? pageState.canonicalLink : '',
                featured: pageState.featured ? pageState.featured : false,
                active: pageState.active ? pageState.active : false
              }}
              validationSchema={BlogSchema}
              onSubmit={async (values) => {
                const data = {
                  _id: pageState._id,
                  userId: '622b3394ecc64734883d6b3c',
                  categoryId: '622b3394ecc64734883d6b3c',
                  title: values.title ? values.title : '',
                  slug: values.slug ? values.slug : '',
                  canonicalLink: values.canonicalLink ? values.canonicalLink : '',
                  metaDescription: values.metaDescription ? values.metaDescription : '',
                  body: values.body ? values.body : '',
                  featured: values.featured ? values.featured : false,
                  active: values.active ? values.active : false,
                  postImg: values.postImg ? values.postImg : '',
                  postThumbnail: values.postThumbnail ? values.postThumbnail : ''
                };

                const newImage = values?.postImg,
                  currImage = pageState?.postImg;
                if (newImage !== currImage) {
                  const formData = new FormData();
                  const newImageFile = await createImageFile(values?.postImg);
                  formData.append('image', newImageFile);
                  formData.append('slug', values?.slug);
                  formData.append('oldImg', pageState?.postImg);
                  try {
                    const res = await API({
                      url: '/uploads/blogs',
                      method: 'post',
                      data: formData
                    });
                    data.postImg = res.data.postImg;
                    data.postThumbnail = res.data.postThumbnail;
                  } catch (error) {
                    console.log(error);
                  }
                }
                dispatch(updateBlog(data));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  window.location.href = '/dashboard/blogs';
                }, 2000);
              }}
            >
              {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Edit Blog Post
                  </Typography>
                  <Stack spacing={1} mt={2}>
                    <FormLabel id="title">Title</FormLabel>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="input-style"
                      placeholder="Blog Title"
                    />
                    {errors.title && touched.title ? (
                      <div className="error-color">{errors.title}</div>
                    ) : null}
                    <FormLabel id="slug">Slug</FormLabel>
                    <Field
                      type="text"
                      id="slug"
                      name="slug"
                      className="input-style"
                      placeholder="Blog Slug"
                    />
                    {errors.slug && touched.slug ? (
                      <div className="error-color">{errors.slug}</div>
                    ) : null}
                    <FormLabel id="metaDescription">Description</FormLabel>
                    <Field
                      type="text"
                      id="metaDescription"
                      name="metaDescription"
                      className="input-style"
                      placeholder="Blog Description"
                    />
                    {errors.metaDescription && touched.metaDescription ? (
                      <div className="error-color">{errors.metaDescription}</div>
                    ) : null}
                    <FormLabel id="body">Body</FormLabel>
                    <BlogRTE setFieldValue={setFieldValue} name="body" value={values.body} />
                    {errors.body && touched.body ? (
                      <div className="error-color">{errors.body}</div>
                    ) : null}
                    <Grid container>
                      <Grid xs={12} sm={12} md={6} lg={6} mt={2}>
                        <FormLabel id="postImg">Upload New Image</FormLabel>
                        <br />
                        <TextField
                          sx={{
                            mt: 1
                          }}
                          className="blog-post-image"
                          id="postImg"
                          name="postImg"
                          type="file"
                          helperText="Required Image Dimensions: 800 x 500"
                          FormHelperTextProps={{
                            className: 'helper-text-style'
                          }}
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
                                setFieldValue('postImg', fileReader.result);
                              }
                            };
                            fileReader.readAsDataURL(image);
                          }}
                        />
                        {errors.postImg && touched.postImg ? (
                          <div className="error-color">{errors.postImg}</div>
                        ) : null}
                      </Grid>
                      <Grid xs={12} sm={12} md={6} lg={6} mt={2}>
                        <FormLabel id="image">Preview</FormLabel>
                        <img
                          src={`${process.env.REACT_APP_NODE_ROOT}/uploads/blog_images/${pageState?.postImg}`}
                          alt={pageState?.title}
                          width="255"
                          height="180"
                        />
                      </Grid>
                    </Grid>

                    <FormLabel id="canonicalLink">Canonical Link</FormLabel>
                    <Field
                      type="text"
                      id="canonicalLink"
                      name="canonicalLink"
                      className="input-style"
                      placeholder="Blog Canonical Link"
                    />
                    {errors.canonicalLink && touched.canonicalLink ? (
                      <div className="error-color">{errors.canonicalLink}</div>
                    ) : null}

                    <FormLabel id="featured">Featured</FormLabel>
                    <Grid>
                      <Grid item lg={5} md={5} xs={10} sm={10}>
                        <FormControlLabel
                          control={<Field component={Switch} type="checkbox" name="featured" />}
                          label={values.featured === true ? 'Featured' : 'Non-Featured'}
                        />
                      </Grid>
                    </Grid>
                    <FormLabel id="active">Status</FormLabel>
                    <Grid>
                      <Grid item lg={5} md={5} xs={10} sm={10}>
                        <FormControlLabel
                          control={<Field component={Switch} type="checkbox" name="active" />}
                          label={values.active === true ? 'Active' : 'In-Active'}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                  <Grid container>
                    <Grid xs={5} sm={5} md={3} lg={2} mt={3}>
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
                    <Grid xs={5} sm={5} md={3} lg={2} ml={3} mt={3}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/dashboard/blogs"
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
