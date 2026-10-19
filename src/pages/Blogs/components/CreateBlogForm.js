import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
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
import { addBlog, API } from 'src/Redux/actions/blogsActions'; // Actions
// ----------------------------------------------------------------------
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp']; // Image Validation

export default function CreateBlogForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  // const userRole = localStorage.getItem('role');
  // Validation Schema
  const BlogSchema = Yup.object().shape({
    title: Yup.string().required('Blog Title is required'),
    slug: Yup.string().required('Blog Slug is required'),
    metaDescription: Yup.string().required('Description is required'),
    postImg: Yup.string().required('Blog Image is required')
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
                title: '',
                slug: '',
                metaDescription: '',
                body: '',
                postImg: '',
                canonicalLink: '',
                featured: false,
                active: true
              }}
              validationSchema={BlogSchema}
              onSubmit={async (values) => {
                const data = {
                  userId: userId,
                  // userRole: userRole,
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

                const formData = new FormData();
                const newImageFile = await createImageFile(values?.postImg);
                formData.append('image', newImageFile);
                formData.append('slug', values?.slug);
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
                console.log('data', data);
                dispatch(addBlog(data, navigate));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
              }}
            >
              {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
                <Form autoComplete="off">
                  <Typography variant="h4" gutterBottom>
                    Add New Blog
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
                    <BlogRTE setFieldValue={setFieldValue} name="body" />
                    {errors.body && touched.body ? (
                      <div className="error-color">{errors.body}</div>
                    ) : null}
                    <FormLabel id="postImg">Post Image</FormLabel>
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
                    <Grid item xs={5} sm={5} md={3} lg={2} mt={3}>
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
                    <Grid item xs={5} sm={5} md={3} lg={2} ml={3} mt={3}>
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
